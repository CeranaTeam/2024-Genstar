from fastapi import APIRouter, HTTPException

from app.core.medical import generate_ingredient_recommendation, generate_diagnosis_recommendation

from .dtos import (
    GenerateIngredientRequest,
    GenerateIngredientResponse,
    GenerateDiagnosisRequest,
    GenerateDiagnosisResponse,
)

router = APIRouter(
    prefix="/generate",
    tags=["generate"]
)

@router.post("/ingredient")
async def ingredient(request: GenerateIngredientRequest) -> GenerateIngredientResponse:
    try:
        ingredient_suggestions = generate_ingredient_recommendation('none', request.context)
        print("[medicine] ingredient_suggestions")
        print(ingredient_suggestions)
        return GenerateIngredientResponse(ingredient_suggestions=ingredient_suggestions, message="Success")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/diagnosis")
async def recommand(request: GenerateDiagnosisRequest) -> GenerateDiagnosisResponse:
    try:
        diagnosis_suggestions = generate_diagnosis_recommendation('none', request.context)
        print("[medicine] diagnosis_suggestions")
        print(diagnosis_suggestions)
        return GenerateDiagnosisResponse(diagnosis_suggestions=diagnosis_suggestions, message="Success")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
