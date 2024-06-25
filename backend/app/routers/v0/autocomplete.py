from fastapi import APIRouter, HTTPException

from app.core.medicine import generate_medication_recommendation

from .dtos import (
    AutocompleteMedicineRequest,
    AutocompleteMedicineResponse,
    AutocompleteRecommandRequest,
    AutocompleteRecommandResponse,
)

router = APIRouter(
    prefix="/autocomplete",
    tags=["autocomplete"]
)

@router.post("/medicine")
async def medicine(request: AutocompleteMedicineRequest) -> AutocompleteMedicineResponse:
    try:
        medicine_suggestions = generate_medication_recommendation('none', request.diagnosis)
        print("[medicine] medicine_suggestions")
        print(medicine_suggestions)
        return AutocompleteMedicineResponse(medicine_suggestions=medicine_suggestions, message="Success")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/recommand")
async def recommand(request: AutocompleteRecommandRequest) -> AutocompleteRecommandResponse:
    pass
