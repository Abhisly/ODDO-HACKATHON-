from app.services.openai_client import get_openai_client
from app.models.schemas import ItineraryRequest

def generate_itinerary(request: ItineraryRequest) -> str:
    client = get_openai_client()
    
    prompt = f"""
    You are an expert travel planner. Please create a detailed {request.days}-day itinerary for a trip to {request.destination}.
    The travelers are interested in: {', '.join(request.interests)}.
    Their budget level is: {request.budget_level}.
    Provide a day-by-day breakdown with suggested activities, dining, and estimated time to spend at each location.
    Make it engaging and practical.
    """
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a professional travel agent and itinerary planner."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=1500
    )
    
    return response.choices[0].message.content
