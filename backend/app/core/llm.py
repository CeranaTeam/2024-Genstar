from langchain_openai import ChatOpenAI
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
if api_key is None:
    raise Exception("OPENAI_API_KEY not set")

llm = ChatOpenAI(model_name="gpt-4o", api_key=api_key, temperature=0.1)
