"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swords, Bot, ShieldAlert } from 'lucide-react';

export default function AIArenaPage() {
  const [debate, setDebate] = useState<any[]>([]);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchDebate = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/v1/ai-debate');
      const data = await res.json();
      setTopic(data.topic);
      setDebate(data.debate);
    } catch(e) {
      console.error(e);
      // Fallback
      setTopic("Adversarial Pattern Subversion");
      setDebate([
          {"speaker": "Red Team (Attacker)", "text": "We inject benign traffic to skew the moving average over 48 hours before the bust-out."},
          {"speaker": "Blue Team (Defender)", "text": "We've deployed Adversarial Training to anticipate this drift, and GNNs monitor the graph edges continuously."}
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDebate();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-4 bg-mc-panel rounded-full mb-4">
          <Swords className="w-12 h-12 text-mc-red" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">AI vs AI Arena</h1>
        <p className="text-xl text-mc-muted">Autonomous Multi-Agent Debate Simulation</p>
        
        {topic && (
          <div className="mt-8 px-6 py-3 bg-mc-darker border border-mc-border rounded-xl inline-block">
            <span className="text-sm font-bold text-mc-muted uppercase tracking-widest">Active Scenario</span>
            <div className="text-2xl font-bold text-mc-orange mt-1">{topic}</div>
          </div>
        )}
      </div>

      <div className="glass-panel p-8 rounded-2xl space-y-8 min-h-[400px]">
        {loading ? (
          <div className="text-center text-mc-muted mt-20">Initializing Generative Debate...</div>
        ) : (
          debate.map((msg, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.8 }}
              className={`flex gap-4 ${msg.speaker.includes('Red') ? 'justify-start' : 'justify-end'}`}
            >
              {msg.speaker.includes('Red') && (
                <div className="w-10 h-10 rounded-full bg-mc-red/20 flex flex-shrink-0 items-center justify-center border border-mc-red">
                  <Bot className="w-5 h-5 text-mc-red" />
                </div>
              )}
              
              <div className={`p-5 rounded-2xl max-w-[80%] ${
                msg.speaker.includes('Red') ? 'bg-mc-darker border border-mc-red/30 rounded-tl-sm' 
                : 'bg-mc-panel border border-mc-accent/30 rounded-tr-sm text-right'
              }`}>
                <div className="text-xs font-bold uppercase tracking-wider mb-2 text-mc-muted">
                  {msg.speaker}
                </div>
                <div className="text-mc-text leading-relaxed">
                  {msg.text}
                </div>
              </div>

              {msg.speaker.includes('Blue') && (
                <div className="w-10 h-10 rounded-full bg-mc-accent/20 flex flex-shrink-0 items-center justify-center border border-mc-accent">
                  <ShieldAlert className="w-5 h-5 text-mc-accent" />
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
      
      <div className="text-center">
        <button 
          onClick={fetchDebate}
          disabled={loading}
          className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-mc-border transition-colors font-medium"
        >
          Simulate Next Debate
        </button>
      </div>
    </div>
  );
}
