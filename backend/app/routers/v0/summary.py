from fastapi import APIRouter, HTTPException

from app.core.summarizer import summarize_context_into_markdown_with_template

from .dtos import (
    SummaryToMarkdownRequest,
    SummaryToMarkdownResponse,
)

router = APIRouter(
    prefix="/summary",
    tags=["summary"]
)

@router.post("/")
async def summary(request: SummaryToMarkdownRequest) -> SummaryToMarkdownResponse:
    try:
        result = summarize_context_into_markdown_with_template(context=request.context, soap_template="default")
        return SummaryToMarkdownResponse(markdown=result, message="Success")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

