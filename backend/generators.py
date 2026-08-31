import json
import random
import uuid
from datetime import datetime, timedelta

ATTACK_CATEGORIES = [
    "Account Takeover", "Synthetic Identity", "AI Voice Clone", "Deepfake Video KYC Bypass", 
    "Prompt Injection Refund", "Mule Network Routing", "Crypto Laundering", 
    "Chargeback Fraud", "Merchant Bust-out", "BGP Hijacking Payment Intercept",
    "Adversarial Pattern Subversion", "Credential Stuffing", "SIM Swap", 
    "Remote Desktop Scam", "Device Fingerprint Spoofing", "API Parameter Tampering",
    "Auth Token Replay", "Cross-border Money Mule", "Invoice Fraud"
]

def generate_synthetic_identity(is_mule=False):
    return {
        "user_id": str(uuid.uuid4())[:8],
        "name": f"User_{random.randint(1000,99999)}",
        "risk_profile": "high" if is_mule else random.choice(["low", "medium", "high"]),
        "account_age_days": random.randint(1, 10) if is_mule else random.randint(100, 3650),
        "kyc_verification_score": random.uniform(0.1, 0.4) if is_mule else random.uniform(0.8, 1.0)
    }

def generate_synthetic_merchant(is_bustout=False):
    return {
        "merchant_id": str(uuid.uuid4())[:8],
        "category": "shell_company" if is_bustout else random.choice(["retail", "crypto", "travel", "gaming", "grocery"]),
        "risk_score": random.uniform(0.8, 1.0) if is_bustout else random.uniform(0.01, 0.2)
    }

def generate_transaction(user, merchant, is_fraud=False):
    amount = round(random.uniform(2000.0, 15000.0), 2) if is_fraud else round(random.uniform(10.0, 500.0), 2)
    return {
        "transaction_id": f"tx_{str(uuid.uuid4())[:8]}",
        "timestamp": (datetime.utcnow() - timedelta(minutes=random.randint(1, 1000))).isoformat(),
        "user_id": user["user_id"],
        "merchant_id": merchant["merchant_id"],
        "amount": amount,
        "currency": "USD",
        "is_fraud_label": is_fraud,
        "device_fingerprint": str(uuid.uuid4())[:8],
        "velocity_1h": random.randint(5, 50) if is_fraud else random.randint(1, 3)
    }

def generate_attack_campaign(attack_type=None, num_events=5):
    actual_attack = attack_type if attack_type else random.choice(ATTACK_CATEGORIES)
    is_mule = "Mule" in actual_attack or "Synthetic" in actual_attack
    is_bustout = "Bust-out" in actual_attack
    
    user = generate_synthetic_identity(is_mule=is_mule)
    merchant = generate_synthetic_merchant(is_bustout=is_bustout)
    
    # Graph generation for High Fidelity Simulation (Nodes & Edges)
    nodes = [
        {"id": user["user_id"], "label": f"Victim/Mule\n{user['name']}", "type": "user"},
        {"id": merchant["merchant_id"], "label": f"Merchant\n{merchant['category']}", "type": "merchant"}
    ]
    edges = []
    events = []
    
    for _ in range(3): # Benign
        tx = generate_transaction(user, merchant, is_fraud=False)
        events.append(tx)
        
    for _ in range(num_events): # Fraud
        # If it's a mule network, route through intermediate nodes
        if is_mule and random.random() > 0.5:
            mule = generate_synthetic_identity(is_mule=True)
            nodes.append({"id": mule["user_id"], "label": f"Mule\n{mule['name']}", "type": "mule"})
            edges.append({"source": user["user_id"], "target": mule["user_id"], "label": "Transfer"})
            tx = generate_transaction(mule, merchant, is_fraud=True)
            edges.append({"source": mule["user_id"], "target": merchant["merchant_id"], "label": f"${tx['amount']}"})
        else:
            tx = generate_transaction(user, merchant, is_fraud=True)
            edges.append({"source": user["user_id"], "target": merchant["merchant_id"], "label": f"Fraud: ${tx['amount']}"})
            
        tx["attack_type"] = actual_attack
        events.append(tx)
        
    # Deduplicate nodes
    unique_nodes = {n['id']: n for n in nodes}.values()
        
    return {
        "campaign_id": str(uuid.uuid4()),
        "attack_type": actual_attack,
        "mitre_mapping": f"T{random.randint(1000, 1500)}", 
        "graph_data": {
            "nodes": list(unique_nodes),
            "edges": edges
        },
        "events": events,
        "expected_financial_impact": sum([e["amount"] for e in events if e.get("is_fraud_label")]),
        "ai_generated_metadata": {
            "complexity": "Critical" if is_mule else "High",
            "success_probability": round(random.uniform(0.6, 0.95), 2),
            "mutation_index": round(random.uniform(0.1, 1.0), 2)
        }
    }
