"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShieldAlert, Network, BrainCircuit, Activity } from 'lucide-react';

const features = [
  {
    icon: <BrainCircuit className="w-8 h-8 text-blue-400" />,
    title: "Autonomous Red Teaming",
    description: "Multi-agent LLM systems that continuously synthesize and execute mock fraud campaigns."
  },
  {
    icon: <Network className="w-8 h-8 text-purple-400" />,
    title: "Synthetic Data Engine",
    description: "Generate high-fidelity, correlated JSON payment events mimicking real-world behaviors."
  },
  {
    icon: <ShieldAlert className="w-8 h-8 text-mc-red" />,
    title: "Multi-Layer Detection",
    description: "Stress-test ML models (Isolation Forest, XGBoost, GNN) against advanced threats."
  },
  {
    icon: <Activity className="w-8 h-8 text-mc-success" />,
    title: "Continuous Retraining",
    description: "Automated feedback loops to harden the payment ecosystem against Day-0 exploits."
  }
];

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-16">
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6 max-w-4xl"
      >
        <div className="inline-block px-4 py-1.5 rounded-full border border-mc-border bg-mc-panel text-sm font-medium text-mc-muted mb-4">
          Mastercard Innovation Challenge 2026
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Next-Gen <span className="mc-gradient-text">Payment Security</span>
        </h1>
        <p className="text-xl text-mc-muted max-w-2xl mx-auto leading-relaxed">
          The ultimate defense simulation platform. A digital twin of the payment ecosystem designed to proactively discover and mitigate GenAI-powered fraud.
        </p>
        
        <div className="flex items-center justify-center gap-4 pt-8">
          <Link 
            href="/dashboard" 
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-mc-red to-mc-orange text-white font-bold hover:shadow-[0_0_30px_rgba(235,0,27,0.4)] transition-all hover:-translate-y-1"
          >
            Enter Defense Lab
          </Link>
          <Link 
            href="/synthetic-data" 
            className="px-8 py-4 rounded-xl glass-panel text-white font-bold hover:bg-white/5 transition-all"
          >
            View Architecture
          </Link>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full pt-16 border-t border-mc-border"
      >
        {features.map((feature, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -5 }}
            className="glass-panel p-6 rounded-2xl text-left space-y-4 hover:border-mc-muted/30 transition-colors cursor-default"
          >
            <div className="p-3 bg-mc-darker rounded-lg w-fit">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="text-sm text-mc-muted leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
