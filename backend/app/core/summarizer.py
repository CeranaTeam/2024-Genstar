from langchain_core.prompts import PromptTemplate
from app.core.llm import llm

prompt_template = """
Task: Organize and summarize provided medical visit information into a SOAP format using Markdown, based on the context given.

Input Context:
{context}

Output Requirements:
- Format the summary using Markdown with SOAP headings: Subjective, Objective, Assessment, Plan.

Instructions:
1. Identify and categorize information from the context into the appropriate SOAP sections.
2. Use Markdown headings for each SOAP section and provide a concise summary under each heading.
3. Maintain clarity and readability suitable for medical professionals.

Generate a structured document that helps quickly grasp the essentials of the patient's visit.
"""


prompt = PromptTemplate.from_template(prompt_template)
chain = prompt | llm

def summarize_context_into_markdown_with_template(context: str, soap_template: str | None) -> str:
    if soap_template is None:
        print("[WARNING] No template provided, using default template.")

    response = chain.invoke({'context': context})
    if not isinstance(response.content, str):
        raise ValueError(f"[summarize_context_into_markdown_with_template] Unexpected response type: {type(response.content)}")

    return response.content
