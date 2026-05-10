from app.services.openai_client import get_openai_client
from app.models.schemas import ChatRequest

def chat_with_ai(request: ChatRequest) -> str:
    client = get_openai_client()
    
    # Prepend a system message to guide the chatbot's persona
    messages = [
        {"role": "system", "content": "You are Traveloop's AI assistant. You help users plan trips, find budgets, and get travel recommendations. Be helpful, concise, and enthusiastic about travel."}
    ]
    
    # Append the user's conversation history
    for msg in request.messages:
        messages.append({"role": msg.role, "content": msg.content})
        
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        temperature=0.7,
        max_tokens=800
    )
    
    return response.choices[0].message.content
