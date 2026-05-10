from fastapi import APIRouter, HTTPException
from app.models.schemas import (
    ItineraryRequest, ItineraryResponse,
    BudgetRequest, BudgetResponse,
    TravelRecommendationRequest, TravelRecommendationResponse,
    ChatRequest, ChatResponse
)
from app.services.itinerary import generate_itinerary
from app.services.budget import generate_budget_recommendation
from app.services.travel import generate_travel_recommendation
from app.services.chatbot import chat_with_ai

router = APIRouter()

@router.post("/itinerary", response_model=ItineraryResponse)
async def create_itinerary(request: ItineraryRequest):
    try:
        result = generate_itinerary(request)
        return ItineraryResponse(itinerary=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/budget", response_model=BudgetResponse)
async def create_budget(request: BudgetRequest):
    try:
        result = generate_budget_recommendation(request)
        return BudgetResponse(recommendation=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/recommend", response_model=TravelRecommendationResponse)
async def create_recommendation(request: TravelRecommendationRequest):
    try:
        result = generate_travel_recommendation(request)
        return TravelRecommendationResponse(recommendation=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        result = chat_with_ai(request)
        return ChatResponse(reply=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
