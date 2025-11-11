import crypto from "crypto"

/**
 * Encryption utilities for private keys
 * Uses AES-256-GCM for authenticated encryption
 * 
 * Security Notes:
 * - Never log or expose encryption keys
 * - Store encryption key securely in environment variables
 * - Use different keys for different environments
 * - Rotate keys periodically in production
 */

// Encryption key from environment variable
// In production, use a strong random key (32 bytes for AES-256)
// WARNING: If ENCRYPTION_KEY is not set, a new random key is generated each time
// This means encrypted data cannot be decrypted after server restart!
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY

if (!ENCRYPTION_KEY && process.env.NODE_ENV === "production") {
  console.error(
    "⚠️ WARNING: ENCRYPTION_KEY not set in production! Private keys will be encrypted with a random key that changes on each restart."
  )
}

// Ensure encryption key is 32 bytes (256 bits) for AES-256
const getEncryptionKey = (): Buffer => {
  // If no key is set, generate a random one (WARNING: data won't be decryptable after restart)
  const key = ENCRYPTION_KEY || crypto.randomBytes(32).toString("hex")
  
  // If key is hex string (64 chars), convert to buffer
  if (key.length === 64 && /^[0-9a-fA-F]{64}$/.test(key)) {
    return Buffer.from(key, "hex")
  }
  // Otherwise, derive key using PBKDF2 (for non-hex keys or shorter keys)
  return crypto.pbkdf2Sync(key, "cloak-desk-salt", 100000, 32, "sha256")
}

/**
 * Encrypt private key using AES-256-GCM
 * Returns encrypted data with IV and auth tag
 */
export function encryptPrivateKey(privateKey: string): string {
  try {
    // Warn if ENCRYPTION_KEY is not set
    // Data encrypted with random keys cannot be decrypted after server restart
    if (!ENCRYPTION_KEY) {
      console.warn(
        "⚠️ WARNING: ENCRYPTION_KEY not set! " +
        "Private key will be encrypted with a random key that changes on each restart. " +
        "This encrypted data will NOT be decryptable after server restart!"
      )
    }

    const key = getEncryptionKey()
    const iv = crypto.randomBytes(16) // Initialization vector
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv)

    // Encrypt the private key
    let encrypted = cipher.update(privateKey, "utf8", "hex")
    encrypted += cipher.final("hex")

    // Get authentication tag
    const authTag = cipher.getAuthTag()

    // Combine IV, auth tag, and encrypted data
    // Format: iv:authTag:encryptedData (all in hex)
    const result = `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`

    return result
  } catch (error) {
    console.error("Error encrypting private key:", error)
    throw new Error("Failed to encrypt private key")
  }
}

/**
 * Decrypt private key using AES-256-GCM
 * Takes encrypted data with IV and auth tag
 */
export function decryptPrivateKey(encryptedData: string): string {
  try {
    // Check if ENCRYPTION_KEY is set
    // If not set, we can't decrypt data that was encrypted with a random key
    if (!ENCRYPTION_KEY) {
      console.error(
        "⚠️ ENCRYPTION_KEY not set! Cannot decrypt data encrypted with random keys."
      )
      throw new Error(
        "ENCRYPTION_KEY not configured. Cannot decrypt private keys."
      )
    }

    // Validate encrypted data format
    if (!encryptedData || typeof encryptedData !== "string") {
      throw new Error("Encrypted data is missing or invalid")
    }

    const parts = encryptedData.split(":")

    if (parts.length !== 3) {
      console.error(
        "Invalid encrypted data format. Expected format: iv:authTag:encryptedData"
      )
      console.error(`Received ${parts.length} parts instead of 3`)
      throw new Error(
        `Invalid encrypted data format: expected 3 parts, got ${parts.length}`
      )
    }

    // Validate each part is valid hex
    const [ivHex, authTagHex, encryptedHex] = parts

    // Check if parts are valid hex strings
    if (!/^[0-9a-fA-F]+$/.test(ivHex)) {
      throw new Error("Invalid IV format: not a valid hex string")
    }
    if (!/^[0-9a-fA-F]+$/.test(authTagHex)) {
      throw new Error("Invalid auth tag format: not a valid hex string")
    }
    if (!/^[0-9a-fA-F]+$/.test(encryptedHex)) {
      throw new Error("Invalid encrypted data format: not a valid hex string")
    }

    // Validate IV length (should be 16 bytes = 32 hex chars)
    if (ivHex.length !== 32) {
      console.error(`Invalid IV length: expected 32 hex chars, got ${ivHex.length}`)
      throw new Error(`Invalid IV length: expected 32 hex chars, got ${ivHex.length}`)
    }

    // Validate auth tag length (should be 16 bytes = 32 hex chars for GCM)
    if (authTagHex.length !== 32) {
      console.error(
        `Invalid auth tag length: expected 32 hex chars, got ${authTagHex.length}`
      )
      throw new Error(
        `Invalid auth tag length: expected 32 hex chars, got ${authTagHex.length}`
      )
    }

    const key = getEncryptionKey()
    const iv = Buffer.from(ivHex, "hex")
    const authTag = Buffer.from(authTagHex, "hex")
    const encrypted = encryptedHex

    // Create decipher
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv)
    decipher.setAuthTag(authTag)

    // Decrypt the data
    let decrypted = decipher.update(encrypted, "hex", "utf8")
    decrypted += decipher.final("utf8")

    return decrypted
  } catch (error) {
    // Log detailed error information for debugging
    console.error("Error decrypting private key:", error)
    
    // If it's already our custom error, re-throw it
    if (error instanceof Error && error.message.includes("ENCRYPTION_KEY")) {
      throw error
    }
    
    // If it's a format validation error, re-throw it
    if (error instanceof Error && error.message.includes("Invalid")) {
      throw error
    }

    // For crypto errors, provide more context
    if (error instanceof Error) {
      if (error.message.includes("Unsupported state") || 
          error.message.includes("unable to authenticate")) {
        throw new Error(
          "Decryption failed: The encryption key may have changed, or the encrypted data is corrupted. " +
          "Ensure ENCRYPTION_KEY environment variable matches the key used during encryption."
        )
      }
    }

    throw new Error("Failed to decrypt private key")
  }
}

/**
 * Validate that a string is a valid private key format
 */
export function isValidPrivateKey(privateKey: string): boolean {
  // Ethereum private keys are 64 hex characters (32 bytes)
  // They can optionally start with "0x"
  const cleaned = privateKey.startsWith("0x") ? privateKey.slice(2) : privateKey
  return /^[0-9a-fA-F]{64}$/.test(cleaned)
}

