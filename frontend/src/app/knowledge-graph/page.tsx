"use client";

import { useState, useEffect } from 'react';
import ReactFlow, { Background, Controls, Edge, Node } from 'reactflow';
import 'reactflow/dist/style.css';
import { Network } from 'lucide-react';

// Custom dark mode theme overrides are in globals.css
export default function KnowledgeGraphPage() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch from backend
    fetch('http://localhost:8000/api/v1/generate-campaign?attack_type=Mule%20Network%20Routing')
      .then(res => res.json())
      .then(data => {
        if(data.data?.graph_data) {
          const rawNodes = data.data.graph_data.nodes;
          const rawEdges = data.data.graph_data.edges;
          
          const reactNodes = rawNodes.map((n: any, idx: number) => ({
            id: n.id,
            data: { label: n.label },
            position: { x: Math.random() * 500, y: Math.random() * 400 },
            style: { 
              background: n.type === 'merchant' ? '#f79e1b' : n.type === 'mule' ? '#eb001b' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '10px',
              fontWeight: 'bold'
            }
          }));

          const reactEdges = rawEdges.map((e: any, idx: number) => ({
            id: `e-${idx}`,
            source: e.source,
            target: e.target,
            label: e.label,
            animated: true,
            style: { stroke: '#eb001b' },
            labelStyle: { fill: 'white', fontWeight: 700 }
          }));

          setNodes(reactNodes);
          setEdges(reactEdges);
        }
      })
      .catch(e => console.error("Error loading graph:", e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 h-[80vh] flex flex-col animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Network className="text-mc-orange" /> Attack Knowledge Graph
        </h1>
        <p className="text-mc-muted mt-2">Interactive visualization of synthetic Mule Networks and flow routing.</p>
      </div>

      <div className="flex-1 glass-panel rounded-xl overflow-hidden border border-mc-border relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center text-mc-muted">Synthesizing network graph...</div>
        ) : (
          <ReactFlow nodes={nodes} edges={edges} fitView>
            <Background color="#334155" gap={20} />
            <Controls />
          </ReactFlow>
        )}
      </div>
    </div>
  );
}
