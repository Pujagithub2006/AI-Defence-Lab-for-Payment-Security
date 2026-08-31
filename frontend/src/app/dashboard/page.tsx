"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, Zap, Server, BrainCircuit, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for initial render before API call
const mockChartData = [
  { time: '00:00', risk: 0.2 },
  { time: '04:00', risk: 0.15 },
  { time: '08:00', risk: 0.4 },
  { time: '12:00', risk: 0.85 }, // Attack Spike
  { time: '16:00', risk: 0.3 },
  { time: '20:00', risk: 0.25 },
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [campaignData, setCampaignData] = useState<any>(null);

  const generateAttack = async () => {
    setLoading(true);
    try {
      // Assuming API is running locally via Docker on port 8000
      const res = await fetch('http://localhost:8000/api/v1/generate-campaign', {
        method: 'POST',
      });
      const data = await res.json();
      setCampaignData(data.data);
    } catch (e) {
      console.error("Failed to fetch API, using fallback data.");
      // Fallback for visual demo if backend isn't up
      setTimeout(() => {
        setCampaignData({
          campaign_id: "SYN-849-2026",
          attack_type: "Account Takeover & Velocity Abuse",
          expected_financial_impact: 14500.50,
          events: [
            { is_fraud_label: false, amount: 45.0, timestamp: "2026-08-31T10:00:00Z" },
            { is_fraud_label: true, amount: 4500.0, timestamp: "2026-08-31T12:05:00Z" }
          ]
        });
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Defense Lab</h1>
          <p className="text-mc-muted">Real-time simulation and threat mitigation</p>
        </div>
        <button 
          onClick={generateAttack}
          disabled={loading}
          className="flex items-center gap-2 bg-mc-panel hover:bg-mc-border border border-mc-border px-4 py-2 rounded-lg transition-colors font-medium"
        >
          {loading ? <RefreshCw className="animate-spin w-4 h-4" /> : <Zap className="w-4 h-4 text-mc-orange" />}
          {loading ? "Synthesizing..." : "Generate New Attack"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Metric Cards */}
        <div className="glass-panel p-6 rounded-xl space-y-2 border-t-2 border-t-mc-accent">
          <div className="flex justify-between items-center text-mc-muted">
            <span className="text-sm font-medium">System Status</span>
            <Server className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold text-mc-success">Active & Defending</p>
        </div>

        <div className="glass-panel p-6 rounded-xl space-y-2 border-t-2 border-t-mc-red">
          <div className="flex justify-between items-center text-mc-muted">
            <span className="text-sm font-medium">Active Threat Level</span>
            <Activity className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold">{campaignData ? "CRITICAL" : "NORMAL"}</p>
        </div>

        <div className="glass-panel p-6 rounded-xl space-y-2 border-t-2 border-t-mc-orange">
          <div className="flex justify-between items-center text-mc-muted">
            <span className="text-sm font-medium">Synthetic Campaigns</span>
            <BrainCircuit className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold">1,432</p>
        </div>

        <div className="glass-panel p-6 rounded-xl space-y-2 border-t-2 border-t-purple-500">
          <div className="flex justify-between items-center text-mc-muted">
            <span className="text-sm font-medium">Models Retrained</span>
            <ShieldAlert className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold">48</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Chart Area */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-6">Global Risk Heatmap</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="risk" 
                  stroke="#eb001b" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#eb001b' }} 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Attack Feed */}
        <div className="glass-panel p-6 rounded-xl flex flex-col">
          <h2 className="text-xl font-bold mb-6">Live AI Simulation Feed</h2>
          
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {!campaignData && !loading && (
              <div className="text-center text-mc-muted py-10">
                Click "Generate New Attack" to start simulation
              </div>
            )}
            
            {campaignData && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 rounded-lg bg-mc-darker border border-mc-red/30 space-y-2"
              >
                <div className="flex items-center gap-2 text-mc-red font-bold text-sm">
                  <ShieldAlert className="w-4 h-4" />
                  NEW THREAT DETECTED
                </div>
                <div className="text-sm font-medium">Type: {campaignData.attack_type}</div>
                <div className="text-xs text-mc-muted">Target: {campaignData.campaign_id}</div>
                <div className="text-sm font-bold mt-2">
                  Est. Impact: <span className="text-mc-orange">${campaignData.expected_financial_impact.toLocaleString()}</span>
                </div>
                <div className="mt-2 text-xs bg-mc-success/20 text-mc-success p-2 rounded">
                  Status: Blocked by IsolationForest_v2.1
                </div>
              </motion.div>
            )}
            
            {/* Historical benign event */}
            <div className="p-4 rounded-lg bg-mc-darker border border-mc-border space-y-2 opacity-50">
               <div className="text-sm font-medium">Standard Checkout</div>
               <div className="text-xs text-mc-muted">Risk Score: 0.12</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
