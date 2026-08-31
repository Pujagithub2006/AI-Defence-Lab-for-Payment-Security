"use client";

import { useState, useEffect, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { RefreshCw } from 'lucide-react';

// Rich fallback graph so the page is never empty
const FALLBACK_NODES: Node[] = [
  { id: 'victim-1', data: { label: 'Victim\nUser_48291' }, position: { x: 80, y: 200 },
    style: { background: '#3b82f6', color: 'white', border: '2px solid #60a5fa', borderRadius: '10px', padding: '12px', fontWeight: 'bold', whiteSpace: 'pre-line' } },
  { id: 'mule-1', data: { label: 'Mule\nUser_77392' }, position: { x: 380, y: 80 },
    style: { background: '#eb001b', color: 'white', border: '2px solid #f87171', borderRadius: '10px', padding: '12px', fontWeight: 'bold', whiteSpace: 'pre-line' } },
  { id: 'mule-2', data: { label: 'Mule\nUser_92041' }, position: { x: 380, y: 320 },
    style: { background: '#eb001b', color: 'white', border: '2px solid #f87171', borderRadius: '10px', padding: '12px', fontWeight: 'bold', whiteSpace: 'pre-line' } },
  { id: 'merchant-1', data: { label: 'Shell Merchant\nAcme Holdings' }, position: { x: 680, y: 80 },
    style: { background: '#f79e1b', color: 'white', border: '2px solid #fbbf24', borderRadius: '10px', padding: '12px', fontWeight: 'bold', whiteSpace: 'pre-line' } },
  { id: 'merchant-2', data: { label: 'Shell Merchant\nNova Crypto Ltd' }, position: { x: 680, y: 320 },
    style: { background: '#f79e1b', color: 'white', border: '2px solid #fbbf24', borderRadius: '10px', padding: '12px', fontWeight: 'bold', whiteSpace: 'pre-line' } },
];

const FALLBACK_EDGES: Edge[] = [
  { id: 'e1', source: 'victim-1', target: 'mule-1', label: 'Transfer $4,200', animated: true,
    style: { stroke: '#eb001b', strokeWidth: 2 }, labelStyle: { fill: '#f8fafc', fontWeight: 700, fontSize: 11 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#eb001b' } },
  { id: 'e2', source: 'victim-1', target: 'mule-2', label: 'Transfer $3,750', animated: true,
    style: { stroke: '#eb001b', strokeWidth: 2 }, labelStyle: { fill: '#f8fafc', fontWeight: 700, fontSize: 11 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#eb001b' } },
  { id: 'e3', source: 'mule-1', target: 'merchant-1', label: 'Fraud $8,432', animated: true,
    style: { stroke: '#f79e1b', strokeWidth: 2 }, labelStyle: { fill: '#f8fafc', fontWeight: 700, fontSize: 11 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f79e1b' } },
  { id: 'e4', source: 'mule-2', target: 'merchant-2', label: 'Fraud $7,120', animated: true,
    style: { stroke: '#f79e1b', strokeWidth: 2 }, labelStyle: { fill: '#f8fafc', fontWeight: 700, fontSize: 11 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f79e1b' } },
  { id: 'e5', source: 'mule-1', target: 'merchant-2', label: 'Fraud $2,900', animated: true,
    style: { stroke: '#f79e1b', strokeWidth: 2 }, labelStyle: { fill: '#f8fafc', fontWeight: 700, fontSize: 11 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f79e1b' } },
];

function buildNodes(rawNodes: any[]): Node[] {
  return rawNodes.map((n: any, idx: number) => ({
    id: n.id,
    data: { label: n.label },
    position: { x: 100 + (idx % 3) * 280, y: 80 + Math.floor(idx / 3) * 200 },
    style: {
      background: n.type === 'merchant' ? '#f79e1b' : n.type === 'mule' ? '#eb001b' : '#3b82f6',
      color: 'white',
      border: `2px solid ${n.type === 'merchant' ? '#fbbf24' : n.type === 'mule' ? '#f87171' : '#60a5fa'}`,
      borderRadius: '10px',
      padding: '12px',
      fontWeight: 'bold',
      whiteSpace: 'pre-line' as const,
    },
  }));
}

function buildEdges(rawEdges: any[]): Edge[] {
  return rawEdges.map((e: any, idx: number) => ({
    id: `e-${idx}`,
    source: e.source,
    target: e.target,
    label: e.label,
    animated: true,
    style: { stroke: '#eb001b', strokeWidth: 2 },
    labelStyle: { fill: '#f8fafc', fontWeight: 700, fontSize: 11 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#eb001b' },
  }));
}

export default function KnowledgeGraphPage() {
  const [nodes, setNodes] = useState<Node[]>(FALLBACK_NODES);
  const [edges, setEdges] = useState<Edge[]>(FALLBACK_EDGES);
  const [loading, setLoading] = useState(false);
  const [attackType, setAttackType] = useState('Mule Network Routing (Fallback Demo)');

  const fetchGraph = useCallback(async () => {
    setLoading(true);
    const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    try {
      // FIX: use POST (the backend endpoint is @app.post)
      const res = await fetch(`${API}/api/v1/generate-campaign?attack_type=Mule%20Network%20Routing&num_events=5`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const graphData = data?.data?.graph_data;
      if (graphData?.nodes?.length > 0) {
        setNodes(buildNodes(graphData.nodes));
        setEdges(buildEdges(graphData.edges));
        setAttackType(data.data.attack_type);
      }
    } catch (e) {
      console.warn('API unavailable, showing demo graph:', e);
      // Fallback already set as default state — nothing to do
      setAttackType('Mule Network Routing (Demo)');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGraph();
  }, [fetchGraph]);

  return (
    <div className="space-y-4 h-[85vh] flex flex-col animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Attack Knowledge Graph</h1>
          <p className="text-mc-muted mt-1">
            Interactive visualization of synthetic Mule Networks and money flow routing.
            <span className="ml-3 text-xs px-2 py-0.5 rounded-full bg-mc-panel border border-mc-border">
              {attackType}
            </span>
          </p>
        </div>
        <button
          onClick={fetchGraph}
          disabled={loading}
          className="flex items-center gap-2 bg-mc-panel hover:bg-mc-border border border-mc-border px-4 py-2 rounded-lg transition-colors text-sm font-medium"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Regenerate Graph
        </button>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-xs font-medium text-mc-muted">
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500 inline-block" /> Victim Account</span>
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-mc-red inline-block" /> Mule Account</span>
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-mc-orange inline-block" /> Shell Merchant</span>
        <span className="flex items-center gap-2"><span className="w-6 h-0.5 bg-mc-red inline-block" /> Fraudulent Transfer</span>
      </div>

      <div className="flex-1 glass-panel rounded-xl overflow-hidden border border-mc-border relative">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-mc-darker/50 text-mc-muted text-sm">
            Synthesizing network graph...
          </div>
        )}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          attributionPosition="bottom-right"
        >
          <Background color="#334155" gap={24} size={1} />
          <Controls
            style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
          />
        </ReactFlow>
      </div>
    </div>
  );
}
