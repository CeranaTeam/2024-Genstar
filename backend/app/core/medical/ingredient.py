from app.core.entity import IngredientSuggestion
from app.utils.parse import parse_ingredient_suggestions
from langchain_core.prompts import PromptTemplate
from app.core.llm import llm


prompt_template = """
Medical History: {medical_history}
Current Diagnosis: {current_diagnosis}

Output: Recommended drug ingredients with reason and side effects (in JSON format)

Example: 
```json
{{
  "ingredients": [
    {{
      "name": "Tirofiban",
      "reason": "Tirofiban is a glycoprotein IIb/IIIa inhibitor used to prevent platelet aggregation and thrombus formation in patients with acute coronary syndrome (ACS). Given the patient's symptoms of chest pain, ST elevation in leads III, II, aVF, and V4R, and history of smoking, he is likely experiencing a right ventricular myocardial infarction. Tirofiban can help reduce the risk of further ischemic events."
      "side_effect": "Bleeding, thrombocytopenia, hypotension, nausea"
    }},
    {{
      "name": "Atorvastatin",
      "reason": "Atorvastatin is a statin that helps to lower cholesterol levels and stabilize atherosclerotic plaques. It is beneficial in the long-term management of patients with coronary artery disease to reduce the risk of future cardiovascular events."
      "side_effect": "Myopathy, liver enzyme abnormalities, gastrointestinal symptoms"
    }}
    // Continue listing medications as needed
  ]
}}
```

Analyze the patient's complete medical history, current diagnosis, laboratory results, and genetic information. Consider drug interactions, allergies, and specific health conditions to tailor an effective treatment plan. The recommended drug ingredients can be of any type, including injectable and oral forms.
Do not include anything other than medication names in the "name" field, and avoid using brackets or including multiple names within a single "name" field. Please ensure the output strictly follows JSON format encapsulated within a Markdown code block. 
"""


prompt = PromptTemplate.from_template(prompt_template)
chain = prompt | llm


def generate_ingredient_recommendation(medical_history: str, current_diagnosis: str) -> list[IngredientSuggestion]:
    print("[generate_ingredient_recommendation] start: ")
    print("[generate_ingredient_recommendation] medical_history")
    print(medical_history)
    print("[generate_ingredient_recommendation] current_diagnosis")
    print(current_diagnosis)
    response = chain.invoke({'medical_history': medical_history, 'current_diagnosis': current_diagnosis})
    print("[generate_ingredient_recommendation] response.content")
    print(response.content)

    if not isinstance(response.content, str):
        print("[generate_ingredient_recommendation] response.content is not str")
        return []

    suggestions = parse_ingredient_suggestions("ingredients", response.content)

    return suggestions

