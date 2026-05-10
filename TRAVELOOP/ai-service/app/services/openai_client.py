import openai
from app.core.config import get_settings

settings = get_settings()

client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)

def get_openai_client() -> openai.OpenAI:
    return client
