"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield } from 'lucide-react';
import Image from 'next/image';

/**
 * CyberMatrixHero Component
 * Animated matrix-style background with CloakDesk branding
 * Adapted to use CloakDesk color scheme (cyan/teal to violet gradient)
 */
const CyberMatrixHero = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure the code only runs on the client, avoiding SSR issues
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !gridRef.current) return;

    const grid = gridRef.current;
    // Matrix characters - mix of alphanumeric and symbols
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>/?;:"[]{}\\|!@#$%^&*()_+-=';
    let columns = 0;
    let rows = 0;

    const createTile = (index: number) => {
      const tile = document.createElement('div');
      tile.classList.add('tile');

      tile.onclick = (e) => {
        const target = e.target as HTMLElement;
        target.textContent = chars[Math.floor(Math.random() * chars.length)];
        target.classList.add('glitch');
        setTimeout(() => target.classList.remove('glitch'), 200);
      };

      return tile;
    };

    const createTiles = (quantity: number) => {
      Array.from(Array(quantity)).map((_, index) => {
        grid.appendChild(createTile(index));
      });
    };

    const createGrid = () => {
      if (!grid) return;
      grid.innerHTML = '';

      const size = 60; // Tile size for a denser grid
      columns = Math.floor(window.innerWidth / size);
      rows = Math.floor(window.innerHeight / size);

      grid.style.setProperty('--columns', columns.toString());
      grid.style.setProperty('--rows', rows.toString());

      createTiles(columns * rows);
      // Set initial characters
      for (const tile of Array.from(grid.children)) {
        (tile as HTMLElement).textContent = chars[Math.floor(Math.random() * chars.length)];
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const radius = window.innerWidth / 4;

      for (const tile of Array.from(grid.children)) {
        const rect = (tile as HTMLElement).getBoundingClientRect();
        const tileX = rect.left + rect.width / 2;
        const tileY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(mouseX - tileX, 2) + Math.pow(mouseY - tileY, 2)
        );
        const intensity = Math.max(0, 1 - distance / radius);

        (tile as HTMLElement).style.setProperty('--intensity', intensity.toString());
      }
    };

    window.addEventListener('resize', createGrid);
    window.addEventListener('mousemove', handleMouseMove);

    createGrid();

    return () => {
      window.removeEventListener('resize', createGrid);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isClient]);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2 + 0.5,
        duration: 0.8,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div className="relative min-h-screen w-full bg-bg900 flex flex-col items-center justify-center overflow-hidden pt-14">
      {/* Animated Grid Background */}
      <div ref={gridRef} id="tiles"></div>

      <style dangerouslySetInnerHTML={{
        __html: `
          #tiles {
            --intensity: 0;
            display: grid;
            grid-template-columns: repeat(var(--columns), 1fr);
            grid-template-rows: repeat(var(--rows), 1fr);
            width: 100vw;
            height: 100vh;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 0;
          }

          .tile {
            position: relative;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'JetBrains Mono', 'Courier New', Courier, monospace;
            font-size: 1.2rem;
            
            /* Use CSS variable for dynamic styling with CloakDesk colors */
            opacity: calc(0.05 + var(--intensity) * 0.95);
            /* Cyan/teal to violet gradient effect */
            color: hsl(
              calc(180 + var(--intensity) * 100), 
              100%, 
              calc(40% + var(--intensity) * 60%)
            );
            text-shadow: 
              0 0 calc(var(--intensity) * 20px) hsl(180, 100%, 60%),
              0 0 calc(var(--intensity) * 40px) hsl(270, 100%, 60%);
            transform: scale(calc(1 + var(--intensity) * 0.3));
            transition: color 0.2s ease, text-shadow 0.2s ease, transform 0.2s ease;
          }

          .tile.glitch {
            animation: glitch-anim 0.2s ease;
          }

          @keyframes glitch-anim {
            0% { 
              transform: scale(1); 
              color: #06b6d4; 
            }
            50% { 
              transform: scale(1.2); 
              color: #7c3aed; 
              text-shadow: 0 0 15px #7c3aed, 0 0 30px #06b6d4; 
            }
            100% { 
              transform: scale(1); 
              color: #06b6d4; 
            }
          }
        `
      }} />

      {/* Overlay Content with CloakDesk Branding */}
      <div className="relative z-10 text-center p-8 bg-bg900/70 backdrop-blur-xl rounded-2xl border border-white/10 shadow-neon-lg max-w-4xl mx-4 mt-16">
        {/* Logo */}
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-center mb-6"
        >
          <div className="relative h-20 w-20 sm:h-24 sm:w-24">
            <Image
              src="/logo.png"
              alt="CloakDesk Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primaryStart/10 border border-primaryStart/20 mb-6"
        >
          <Shield className="h-4 w-4 text-primaryStart" />
          <span className="text-sm font-medium text-textPrimary">
            Privacy-First Blockchain Dashboard
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 gradient-text"
        >
          CloakDesk
        </motion.h1>

        {/* Description */}
        <motion.p
          custom={3}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto text-lg md:text-xl text-textSecondary mb-10 leading-relaxed"
        >
          Protect your blockchain privacy with advanced tools for stealth routing, wallet shadowing, and zero-knowledge proofs.
        </motion.p>

        {/* CTA Button - Scroll to features */}
        <motion.div
          custom={4}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-center"
        >
          <a
            href="#features"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-primary text-white font-semibold rounded-xl shadow-neon hover:shadow-neon-lg transition-all duration-300 hover:scale-105"
          >
            Explore Features
            <ArrowRight className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default CyberMatrixHero;

