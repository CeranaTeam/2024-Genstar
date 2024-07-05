from langchain_core.prompts import PromptTemplate
from app.core.llm import llm

prompt_template = """
Task: Organize and summarize provided medical visit information into a concise and consistent medical record using Markdown format.

Input Context:
{context}

Output Requirements:

Do not add any information not present in the provided context.
Ensure the output is brief, written in complete sentences, and not just formatted as SOAP sections but as a coherent medical note.
Instructions:

Use bold text, code formatting, backslashes, or other Markdown elements to enhance readability.
Maintain clarity and readability suitable for medical professionals.
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
