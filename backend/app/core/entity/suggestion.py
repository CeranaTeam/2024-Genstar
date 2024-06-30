from pydantic import BaseModel

class Suggestion(BaseModel):
    name: str
    reason: str
