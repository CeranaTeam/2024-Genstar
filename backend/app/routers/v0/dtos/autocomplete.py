from pydantic import BaseModel

class AutocompleteMedicineRequest(BaseModel):
    diagnosis: str

class AutocompleteMedicineResponse(BaseModel):
    medicine_suggestions: list[dict]
    message: str

class AutocompleteRecommandRequest(BaseModel):
    diagnosis: str
    medicine: list[str]

class AutocompleteRecommandResponse(BaseModel):
    message: str

