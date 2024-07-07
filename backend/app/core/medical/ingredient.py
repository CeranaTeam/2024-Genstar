from app.core.entity import IngredientSuggestion
from app.utils.parse import parse_ingredient_suggestions
from langchain_core.prompts import PromptTemplate
from app.core.llm import llm


prompt_template = """
Medical History: {medical_history}
Current Diagnosis: {current_diagnosis}

Output: Recommended drug ingredients with reason and side effects (in JSON format)

```json
{{
  "ingredients": [
    {{
      "name": "Medication name",
      "reason": "Detailed justification focusing on safety, efficacy, and patient-specific considerations"
      "side_effect": "List of side effects associated with the medication"
    }},
    {{
      "name": "Medication name",
      "reason": "Detailed justification focusing on safety, efficacy, and patient-specific considerations"
      "side_effect": "List of side effects associated with the medication"
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

