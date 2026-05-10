from pydantic import BaseModel
from typing import List, Optional

class ItineraryRequest(BaseModel):
    destination: str
    days: int
    interests: List[str]
    budget_level: str

class ItineraryResponse(BaseModel):
    itinerary: str

class BudgetRequest(BaseModel):
    destination: str
    days: int
    travelers: int
    travel_style: str

class BudgetResponse(BaseModel):
    recommendation: str

class TravelRecommendationRequest(BaseModel):
    starting_location: str
    preferences: List[str]
    max_travel_time_hours: Optional[int] = None

class TravelRecommendationResponse(BaseModel):
    recommendation: str

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]

class ChatResponse(BaseModel):
    reply: str
