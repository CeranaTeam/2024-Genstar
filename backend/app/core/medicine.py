import os

from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from app.utils.parse import parse_out_all_between_square_brackets

load_dotenv()

prompt_template = """
Input: Patient's medical history and current diagnosis

Medical History: {medical_history}
Current Diagnosis: {current_diagnosis}
Output: Recommended medications with reasons

* Medication 1: [Medication name]
Reason: [Detailed justification focusing on safety, efficacy, and patient-specific considerations]
* Medication 2: [Medication name]
Reason: [Detailed justification focusing on safety, efficacy, and patient-specific considerations]
(Continue listing medications as needed)

Please analyze the patient's complete medical background, including any laboratory results and genetic information. Consider drug interactions, allergies, and specific health conditions to tailor the treatment plan effectively. The output should provide clear, structured justifications for each recommended medication.
"""

llm = ChatOpenAI(model_name="gpt-4-turbo", openai_api_key=os.getenv("OPENAI_API_KEY"))

prompt = PromptTemplate.from_template(prompt_template)
chain = prompt | llm

def generate_medication_recommendation(medical_history: str, current_diagnosis: str) -> list[str]:
    print("[generate_medication_recommendation] start")
    print("[generate_medication_recommendation] medical_history")
    print(medical_history)
    print("[generate_medication_recommendation] current_diagnosis")
    print(current_diagnosis)
    response = chain.invoke({'medical_history': medical_history, 'current_diagnosis':current_diagnosis})
    print("[generate_medication_recommendation] response.content")
    print(response.content)
    return parse_out_all_between_square_brackets(response.content)
