from app.services.openai_client import get_openai_client
from app.models.schemas import BudgetRequest

def generate_budget_recommendation(request: BudgetRequest) -> str:
    client = get_openai_client()
    
    prompt = f"""
    You are a financial advisor specializing in travel. 
    The user is planning a trip to {request.destination} for {request.days} days with {request.travelers} travelers in total.
    Their preferred travel style is: {request.travel_style}.
    
    Please provide a comprehensive budget recommendation that includes:
    1. Estimated total cost.
    2. Breakdown of costs (accommodation, flights/transportation, food, activities, miscellaneous).
    3. Money-saving tips specific to {request.destination} and their travel style.
    """
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a knowledgeable travel budget planner and financial advisor."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.6,
        max_tokens=1000
    )
    
    return response.choices[0].message.content
