from pydantic import BaseModel

class SummaryToMarkdownRequest(BaseModel):
    context: str

class SummaryToMarkdownResponse(BaseModel):
    markdown: str
    message: str
