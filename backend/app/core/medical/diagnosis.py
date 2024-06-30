from app.core.entity import Suggestion
from app.utils.parse import parse_suggestions
from langchain_core.prompts import PromptTemplate
from app.core.llm import llm


prompt_template = """
Medical History: {medical_history}
Current Diagnosis: {current_diagnosis}

Output: Detailed Assessment - Symptoms and their inferred causes

```
{{
  "symptoms": [
    {{
      "name": "Symptom name",
      "reason": "Inferred cause based on medical history and current diagnosis."
    }},
    {{
      "name": "Another symptom name",
      "reason": "Inferred cause based on medical history and current diagnosis."
    }}
    // Continue listing symptoms and causes as needed
  ]
}}
```

Please ensure the output strictly follows JSON format encapsulated within a Markdown code block. Analyze the patient's complete medical background, including any laboratory results and genetic information. Consider drug interactions, allergies, and specific health conditions to tailor the treatment plan effectively. The structured JSON output will facilitate easy integration and analysis in various health systems.
"""


prompt = PromptTemplate.from_template(prompt_template)
chain = prompt | llm


def generate_diagnosis_recommendation(medical_history: str, current_diagnosis: str) -> list[Suggestion]:
    print("[generate_diagnosis_recommendation] start: ")
    print("[generate_diagnosis_recommendation] medical_history")
    print(medical_history)
    print("[generate_diagnosis_recommendation] current_diagnosis")
    print(current_diagnosis)
    response = chain.invoke({'medical_history': medical_history, 'current_diagnosis': current_diagnosis})
    print("[generate_diagnosis_recommendation] response.content")
    print(response.content)

    if not isinstance(response.content, str):
        print("[generate_diagnosis_recommendation] response.content is not str")
        return []

    suggestions = parse_suggestions("symptoms", response.content)

    return suggestions

