import json
import os

from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI

load_dotenv()

prompt_template = """
Medical History: {medical_history}
Current Diagnosis: {current_diagnosis}

Output: Recommended medications with reasons (in JSON format)

```
{{
  "medications": [
    {{
      "name": "Medication name",
      "reason": "Detailed justification focusing on safety, efficacy, and patient-specific considerations"
    }},
    {{
      "name": "Medication name",
      "reason": "Detailed justification focusing on safety, efficacy, and patient-specific considerations"
    }}
    // Continue listing medications as needed
  ]
}}

Please ensure the output strictly follows JSON format encapsulated within a Markdown code block. Analyze the patient's complete medical background, including any laboratory results and genetic information. Consider drug interactions, allergies, and specific health conditions to tailor the treatment plan effectively. The structured JSON output will facilitate easy integration and analysis in various health systems.
"""

llm = ChatOpenAI(model_name="gpt-4-turbo", openai_api_key=os.getenv("OPENAI_API_KEY"))

prompt = PromptTemplate.from_template(prompt_template)
chain = prompt | llm

def parse_json_medication_response(json_response) -> list[dict]:
    print("[parse_json_medication_response] start")
# Remove the code block syntax if included in the response
    json_response = json_response.strip('```json')
    json_response = json_response.strip('```')
    print("[parse_json_medication_response] json_response")
    print(json_response)

    try:
# Parse the JSON data from the response
        json_data = json.loads(json_response)
        medications = json_data.get('medications', []) 
        return medications
    except json.JSONDecodeError as e:
        print(f"Failed to decode JSON: {e}")
    return []

def generate_medication_recommendation(medical_history: str, current_diagnosis: str) -> list[dict]:
    print("[generate_medication_recommendation] start: ")
    print("[generate_medication_recommendation] medical_history")
    print(medical_history)
    print("[generate_medication_recommendation] current_diagnosis")
    print(current_diagnosis)
    response = chain.invoke({'medical_history': medical_history, 'current_diagnosis': current_diagnosis})
    print("[generate_medication_recommendation] response.content")
    print(response.content)
    return parse_json_medication_response(response.content)
