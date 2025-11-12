import { MongoClient, Db, Collection, Document } from "mongodb"

/**
 * MongoDB connection utility
 * Handles database connections and provides collection access
 * 
 * Note: In production, use connection pooling and handle reconnections
 */

// MongoDB connection string from environment variable
// WARNING: Never hardcode connection strings with credentials in source code
// Always use environment variables for production
const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI && process.env.NODE_ENV === "production") {
  console.error(
    "⚠️ ERROR: MONGODB_URI environment variable is required in production!"
  )
  throw new Error("MONGODB_URI environment variable is not set")
}

if (!MONGODB_URI) {
  console.warn(
    "⚠️ WARNING: MONGODB_URI not set. MongoDB features will not work."
  )
}

const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || "cloak"

// Cache the database connection
let client: MongoClient | null = null
let db: Db | null = null

/**
 * Get MongoDB database instance
 * Creates connection if it doesn't exist, reuses if it does
 */
export async function getDatabase(): Promise<Db> {
  if (db) {
    return db
  }

  // Check if MongoDB URI is configured
  if (!MONGODB_URI) {
    throw new Error(
      "MONGODB_URI environment variable is not set. Please configure it in your .env.local file."
    )
  }

  try {
    // Create new client if it doesn't exist
    if (!client) {
      client = new MongoClient(MONGODB_URI, {
        // Connection options for better reliability
        maxPoolSize: 10,
        minPoolSize: 2,
        maxIdleTimeMS: 30000,
        serverSelectionTimeoutMS: 5000,
      })
    }

    // Connect to MongoDB
    await client.connect()
    db = client.db(MONGODB_DB_NAME)

    console.log("Connected to MongoDB")
    return db
  } catch (error) {
    console.error("Error connecting to MongoDB:", error)
    throw error
  }
}

/**
 * Get a collection from the database
 */
export async function getCollection<T extends Document>(collectionName: string): Promise<Collection<T>> {
  const database = await getDatabase()
  return database.collection<T>(collectionName)
}

/**
 * Close MongoDB connection
 * Call this when shutting down the application
 */
export async function closeConnection(): Promise<void> {
  if (client) {
    await client.close()
    client = null
    db = null
    console.log("MongoDB connection closed")
  }
}

/**
 * Decoy wallet document interface
 */
export interface DecoyWallet {
  _id?: string
  userId: string // Wallet address of the user who owns this decoy
  address: string // Decoy wallet address
  privateKeyEncrypted: string // Encrypted private key
  persona: string // Wallet persona (whale, degen, small-trader, etc.)
  status: "active" | "inactive" | "deleted"
  createdAt: Date
  updatedAt: Date
}

/**
 * Obfuscation task document interface
 * Stores stealth routing tasks in the database
 */
export interface ObfuscationTaskDocument {
  _id?: string
  userId: string // Wallet address of the user who created this task
  sourceWallet: string // Source wallet address
  tokens: string[] // Tokens to obfuscate (ETH, USDC, etc.)
  profile: "light" | "standard" | "max" // Obfuscation profile
  status: "queued" | "processing" | "completed" | "failed"
  scheduledFor?: Date // When to execute the task
  txHash?: string // Transaction hash when completed
  relayerId?: string // Relayer used for the task
  costEstimate: string // Estimated cost in credits/NOVA
  chainId: number // Chain ID (1 = Ethereum mainnet, etc.)
  createdAt: Date
  updatedAt: Date
}



