from app.services.openai_client import get_openai_client
from app.models.schemas import TravelRecommendationRequest

def generate_travel_recommendation(request: TravelRecommendationRequest) -> str:
    client = get_openai_client()
    
    time_limit_str = f"They want to travel for a maximum of {request.max_travel_time_hours} hours from their starting location." if request.max_travel_time_hours else "Travel time is not a strict constraint."
    
    prompt = f"""
    The user is starting from {request.starting_location}.
    Their interests and preferences are: {', '.join(request.preferences)}.
    {time_limit_str}
    
    Based on this, suggest 3 highly recommended travel destinations. For each destination, provide:
    1. Why it matches their preferences.
    2. Estimated travel time and best mode of transportation from {request.starting_location}.
    3. A highlight or must-do activity.
    """
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a personalized travel recommendation engine."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.8,
        max_tokens=1200
    )
    
    return response.choices[0].message.content
