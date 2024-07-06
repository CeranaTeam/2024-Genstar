from pydantic import BaseModel

class Suggestion(BaseModel):
    name: str
    reason: str

class IngredientSuggestion(Suggestion):
    side_effect: str
