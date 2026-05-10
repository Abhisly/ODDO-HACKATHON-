from fastapi import FastAPI
from app.api.v1 import router as api_v1_router

app = FastAPI(title="Traveloop AI Service")

@app.get("/")
async def root():
    return {"message": "Traveloop AI Service is online"}

app.include_router(api_v1_router, prefix="/api/v1")
