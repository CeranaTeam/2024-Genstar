from pydantic import BaseModel, Field
from app.core.entity import DiseaseInfo, DrugInfo

class AutocompleteDrugRequest(BaseModel):
    query: str = Field(examples=["stat"])
    page_size: int = Field(examples=[10, 20, 30])
    page: int = Field(examples=[1, 2, 3])

class AutocompleteDrugResponse(BaseModel):
    drugs: list[DrugInfo]
    message: str

class AutocompleteDiagnosisRequest(BaseModel):
    query: str = Field(examples=["diab"])

class AutocompleteDiagnosisResponse(BaseModel):
    diagnosis: list[DiseaseInfo]
    message: str

