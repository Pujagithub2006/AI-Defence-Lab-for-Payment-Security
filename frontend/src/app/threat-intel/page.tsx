"use client";

import { motion } from 'framer-motion';
import { Shield, Target, AlertTriangle } from 'lucide-react';

const attackVectors = [
  { name: "Account Takeover", mitigations: ["MFA", "Device Fingerprinting"], risk: "High", mapped: "T1566" },
  { name: "Synthetic Identity", mitigations: ["Graph Analysis", "Advanced KYC"], risk: "Critical", mapped: "T1589" },
  { name: "AI Voice Clone", mitigations: ["Voice Biometrics", "Liveness Detection"], risk: "Critical", mapped: "T1566.004" },
  { name: "Prompt Injection Refund", mitigations: ["LLM Guardrails", "Manual Review limit"], risk: "High", mapped: "T1548" },
  { name: "Mule Network Routing", mitigations: ["Velocity Checks", "IP Geo-fencing"], risk: "High", mapped: "T1550" },
  { name: "Merchant Bust-out", mitigations: ["Credit Monitoring", "Volume Anomaly"], risk: "Critical", mapped: "T1486" },
  { name: "Chargeback Fraud", mitigations: ["Behavioral History", "Delivery Proofs"], risk: "Medium", mapped: "T1485" },
  { name: "Adversarial Pattern Subversion", mitigations: ["Robust ML", "Adversarial Training"], risk: "Critical", mapped: "T1562" },
];

export default function ThreatIntelPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Target className="text-mc-red" /> Threat Intelligence Matrix
        </h1>
        <p className="text-mc-muted mt-2">Active attack vectors supported by the Autonomous Generation Engine.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {attackVectors.map((attack, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-6 rounded-xl space-y-4"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold">{attack.name}</h3>
              <span className={`px-2 py-1 text-xs font-bold rounded-md ${
                attack.risk === 'Critical' ? 'bg-mc-red/20 text-mc-red' :
                attack.risk === 'High' ? 'bg-mc-orange/20 text-mc-orange' :
                'bg-yellow-500/20 text-yellow-500'
              }`}>
                {attack.risk}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium text-mc-muted flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> MITRE ATT&CK: {attack.mapped}
              </div>
              
              <div className="pt-4 border-t border-mc-border">
                <span className="text-xs text-mc-muted uppercase tracking-wider font-bold">Recommended Mitigations</span>
                <ul className="mt-2 space-y-1">
                  {attack.mitigations.map((mit, i) => (
                    <li key={i} className="text-sm flex items-center gap-2">
                      <Shield className="w-3 h-3 text-mc-success" /> {mit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
