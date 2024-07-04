from fastapi import APIRouter, HTTPException
from app.infra.repo import PGCMRepo
from app.core.repo import CMRepo
from app.core.repo.drug_service import DrugService, DrugRequestPayload
from app.infra.restful import NHIDrugService

from .dtos import (
    AutocompleteDrugRequest,
    AutocompleteDrugResponse,
    AutocompleteDiagnosisRequest,
    AutocompleteDiagnosisResponse,
)

router = APIRouter(
    prefix="/autocomplete",
    tags=["autocomplete"]
)


@router.post("/drug")
async def drug(request: AutocompleteDrugRequest) -> AutocompleteDrugResponse:
    drug_servie: DrugService = NHIDrugService()
    try:
        payload = DrugRequestPayload(ing_name=request.query, curpage=request.page, page_size=request.page_size)
        drugs = drug_servie.get_drug_info(payload)
        print("[medicine] drugs")
        print(drugs)
        return AutocompleteDrugResponse(drugs=drugs, message="Success")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/diagnosis")
async def diagnosis(request: AutocompleteDiagnosisRequest) -> AutocompleteDiagnosisResponse:
    cm_repo: CMRepo = PGCMRepo()
    try:
        diagnosis = cm_repo.search_similar_diseases(request.query.lower())
        print("[medicine] diagnosis")
        print(diagnosis)
        return AutocompleteDiagnosisResponse(diagnosis=diagnosis, message="Success")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
