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
        response = generate_medication_recommendation('none', request.diagnosis)
        return AutocompleteMedicineResponse(medications=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/recommand")
async def recommand(request: AutocompleteRecommandRequest) -> AutocompleteRecommandResponse:
    pass
