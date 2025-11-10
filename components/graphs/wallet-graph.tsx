"use client"

import * as React from "react"
import { useEffect, useRef } from "react"
import cytoscape from "cytoscape"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

/**
 * Wallet Graph Component
 * Visualizes wallet connections and network graph using Cytoscape.js
 * Enhanced with modern cyberpunk styling and animations
 * Uses real addresses from transactions when available
 */
export function WalletGraph({ 
  walletAddress, 
  connectedAddresses = [] 
}: { 
  walletAddress?: string
  connectedAddresses?: string[]
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cyRef = useRef<cytoscape.Core | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Build nodes from real addresses
    const nodes: any[] = []
    const edges: any[] = []
    
    // Main wallet node
    if (walletAddress) {
      nodes.push({
        data: {
          id: "main",
          label: walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4),
          type: "main",
          address: walletAddress,
        },
      })
    }

    // Add connected addresses from real transactions
    connectedAddresses.forEach((addr, index) => {
      if (addr && addr.toLowerCase() !== walletAddress?.toLowerCase()) {
        const nodeId = `node-${index}`
        nodes.push({
          data: {
            id: nodeId,
            label: addr.slice(0, 6) + "..." + addr.slice(-4),
            type: "connected",
            address: addr,
          },
        })
        
        // Connect to main wallet
        if (walletAddress) {
          edges.push({
            data: {
              id: `edge-${index}`,
              source: "main",
              target: nodeId,
            },
          })
        }
      }
    })

    // If no real addresses, show some placeholder nodes
    if (nodes.length === 1 && edges.length === 0) {
      // Add a few placeholder nodes to show the graph structure
      for (let i = 0; i < 3; i++) {
        const nodeId = `placeholder-${i}`
        nodes.push({
          data: {
            id: nodeId,
            label: `Address ${i + 1}...`,
            type: "connected",
          },
        })
        if (walletAddress) {
          edges.push({
            data: {
              id: `edge-placeholder-${i}`,
              source: "main",
              target: nodeId,
            },
          })
        }
      }
    }

    // Initialize Cytoscape with enhanced styling
    const cy = cytoscape({
      container: containerRef.current,
      elements: [...nodes, ...edges],
      style: [
        // Base node styling - connected wallets
        {
          selector: "node",
          style: {
            "background-color": "#7c3aed", // Primary end (violet)
            "background-opacity": 0.9,
            "border-width": 2,
            "border-color": "#7c3aed",
            "border-opacity": 0.6,
            "label": "data(label)",
            "width": 50,
            "height": 50,
            "font-size": "9px",
            "font-weight": 500,
            "color": "#ffffff",
            "text-valign": "bottom",
            "text-halign": "center",
            "text-margin-y": 8,
            "text-outline-width": 2,
            "text-outline-color": "#0b0f14",
            "text-outline-opacity": 0.8,
            "shape": "ellipse",
            "overlay-opacity": 0,
          },
        },
        // Main wallet - larger with gradient effect
        {
          selector: "node[type='main']",
          style: {
            "background-color": "#06b6d4", // Primary start (cyan/teal)
            "background-opacity": 1,
            "border-width": 3,
            "border-color": "#06b6d4",
            "border-opacity": 0.8,
            "width": 70,
            "height": 70,
            "font-size": "10px",
            "font-weight": 600,
          },
        },
        // Decoy wallets - smaller with different color
        {
          selector: "node[type='decoy']",
          style: {
            "background-color": "#8b5cf6", // Electric purple
            "background-opacity": 0.7,
            "border-width": 2,
            "border-color": "#8b5cf6",
            "border-opacity": 0.5,
            "width": 40,
            "height": 40,
            "font-size": "8px",
            "font-weight": 500,
          },
        },
        // Hover effect for all nodes
        {
          selector: "node:selected",
          style: {
            "background-opacity": 1,
            "border-width": 3,
            "border-opacity": 1,
            "width": "mapData(selected, 0, 1, 50, 60)",
            "height": "mapData(selected, 0, 1, 50, 60)",
            "overlay-opacity": 0.2,
            "overlay-color": "#7c3aed",
          },
        },
        // Edge styling - connections between wallets
        {
          selector: "edge",
          style: {
            "width": 2.5,
            "line-color": "#7c3aed", // Violet for connections
            "line-opacity": 0.4,
            "target-arrow-color": "#7c3aed",
            "target-arrow-opacity": 0.4,
            "target-arrow-shape": "triangle",
            "target-arrow-size": 8,
            "curve-style": "bezier",
            "control-point-step-size": 50,
            // Add subtle glow to edges
            "source-endpoint": "outside-to-node",
            "target-endpoint": "outside-to-node",
          } as any,
        },
        // Edge hover effect
        {
          selector: "edge:selected",
          style: {
            "width": 3.5,
            "line-opacity": 0.8,
            "target-arrow-opacity": 0.8,
          } as any,
        },
      ] as any,
      layout: {
        name: "cose",
        padding: 40,
        nodeRepulsion: 4500,
        idealEdgeLength: 100,
        edgeElasticity: 0.45,
        nestingFactor: 0.1,
        gravity: 0.25,
        numIter: 2500,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0,
      },
      // Better user interaction
      userPanningEnabled: true,
      userZoomingEnabled: true,
      boxSelectionEnabled: true,
      selectionType: "single",
      minZoom: 0.1,
      maxZoom: 2,
    })

    cyRef.current = cy

    // Add hover effects for better interactivity
    cy.on("mouseover", "node", (evt) => {
      const node = evt.target
      node.style({
        "border-width": 4,
        "border-opacity": 1,
        "overlay-opacity": 0.15,
        "overlay-color": node.data("type") === "main" ? "#06b6d4" : "#7c3aed",
      })
    })

    cy.on("mouseout", "node", (evt) => {
      const node = evt.target
      const type = node.data("type")
      const borderWidth = type === "main" ? 3 : type === "decoy" ? 2 : 2
      node.style({
        "border-width": borderWidth,
        "border-opacity": type === "main" ? 0.8 : 0.6,
        "overlay-opacity": 0,
      })
    })

    // Add click handler for node inspection
    cy.on("tap", "node", (evt) => {
      const node = evt.target
      console.log("Node clicked:", node.data())
      // In production, show node details in a side panel
    })

    // Fit the graph nicely in the container
    cy.fit(undefined, 50)

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy()
        cyRef.current = null
      }
    }
  }, [walletAddress, connectedAddresses])

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="gradient-text">Wallet Network Graph</CardTitle>
        <CardDescription>
          Interactive visualization of wallet connections and network topology
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Graph container with enhanced styling */}
        <div className="relative rounded-xl border border-white/10 bg-gradient-to-br from-bg800/80 to-bg700/40 backdrop-blur-sm overflow-hidden shadow-neon">
          {/* Subtle gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-radial from-primaryStart/5 via-transparent to-transparent pointer-events-none z-0" />
          
          {/* Graph canvas */}
          <div
            ref={containerRef}
            className="relative h-[500px] w-full rounded-xl"
            style={{ minHeight: "500px" }}
          />
          
          {/* Instructions overlay (hidden on hover) */}
          <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-bg900/80 backdrop-blur-sm border border-white/10 text-xs text-muted">
            <span className="hidden sm:inline">Click nodes to inspect • Drag to pan • Scroll to zoom</span>
            <span className="sm:hidden">Tap to interact</span>
          </div>
        </div>

        {/* Enhanced legend with better styling */}
        <div className="mt-6 flex flex-wrap items-center gap-6 p-4 rounded-xl border border-white/10 bg-bg800/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-4 w-4 rounded-full bg-primaryStart border-2 border-primaryStart/60 shadow-neon-teal" />
              <div className="absolute inset-0 h-4 w-4 rounded-full bg-primaryStart/30 animate-pulse" />
            </div>
            <span className="text-sm font-medium text-textPrimary">Main Wallet</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-4 w-4 rounded-full bg-primaryEnd border-2 border-primaryEnd/60" />
            </div>
            <span className="text-sm font-medium text-textPrimary">Connected</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-4 w-4 rounded-full bg-electric border-2 border-electric/60" />
            </div>
            <span className="text-sm font-medium text-textPrimary">Decoy</span>
          </div>
          <div className="ml-auto text-xs text-muted">
            <span className="hidden sm:inline">Network topology visualization</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
