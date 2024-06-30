import re
from app.core.entity import Suggestion
import json

def parse_out_all_between_square_brackets(text):
    return re.findall(r'\[(.*?)\]', text)

def extract_codeblocks(text: str) -> list[str]:
    # Use regular expression to find all occurrences of text between ```
    pattern = r'```(.*?)```'
    matches = re.findall(pattern, text, re.DOTALL)
    
    # Split the matches into separate questions
    questions = []
    for match in matches:
        questions.extend([q.strip() for q in match.split('\n') if q.strip()])
    
    return questions

def parse_suggestions(target:str, json_response: str) -> list[Suggestion]:
    print("[parse_json_medication_response] start")
# Remove the code block syntax if included in the response
    json_response = json_response.strip('```json')
    json_response = json_response.strip('```')
    print("[parse_json_medication_response] json_response")
    print(json_response)

    try:
# Parse the JSON data from the response
        json_data = json.loads(json_response)
        medications = json_data.get(target, []) 
        suggestions = [Suggestion(name=medication['name'], reason=medication['reason']) for medication in medications]
        return suggestions
    except json.JSONDecodeError as e:
        print(f"Failed to decode JSON: {e}")

    return []
