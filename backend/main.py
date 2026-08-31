from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Mastercard AI Defense Lab API",
    description="Backend API for the Autonomous AI Red Teaming Platform (Simulation & Detection)",
    version="1.0.0"
)

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "AI Defense Lab API is running."}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/api/v1/generate-campaign")
def api_generate_campaign(attack_type: str = "account_takeover", num_events: int = 5):
    from generators import generate_attack_campaign
    campaign = generate_attack_campaign(attack_type=attack_type, num_events=num_events)
    return {"status": "success", "data": campaign}

@app.post("/api/v1/analyze")
def api_analyze_transaction(payload: dict):
    from detection import analyze_transaction
    transaction = payload.get("transaction", {})
    user_profile = payload.get("user_profile", None)
    result = analyze_transaction(transaction, user_profile)
    return {"status": "success", "analysis": result}

@app.get("/api/v1/ai-debate")
def api_ai_debate():
    # Simulates a debate between Red Team and Blue Team agents
    import random
    from generators import ATTACK_CATEGORIES
    topic = random.choice(ATTACK_CATEGORIES)
    return {
        "status": "success",
        "topic": topic,
        "debate": [
            {"speaker": "Red Team (Attacker)", "text": f"By mutating the {topic} payload and tunneling through a synthetic mule network, we can easily bypass static rules."},
            {"speaker": "Blue Team (Defender)", "text": "Isolation Forest will immediately flag the velocity density in the graph network, while our XGBoost layer will detect the payload signature."},
            {"speaker": "Red Team (Attacker)", "text": "Only if your features aren't drifting. We inject benign traffic to skew the moving average over 48 hours before the bust-out."},
            {"speaker": "Blue Team (Defender)", "text": "We've deployed Adversarial Training to anticipate this drift, and GNNs monitor the graph edges continuously."}
        ]
    }
