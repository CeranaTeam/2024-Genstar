import re
from app.core.entity import Suggestion
import json

from app.core.entity.suggestion import IngredientSuggestion

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
    # Find the JSON block within the backticks
    start_index = json_response.find('```json') + 7  # Find the start of JSON block, add 7 to skip '```json'
    end_index = json_response.find('```', start_index)  # Find the end of JSON block

    # print("[parse_json_medication_response] start_index")
    # print(start_index)
    # print("[parse_json_medication_response] end_index")
    # print(end_index)
    
    # Extract and clean the JSON text
    json_response = json_response[start_index:end_index].strip()
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

def parse_ingredient_suggestions(target:str, json_response: str) -> list[IngredientSuggestion]:
    print("[parse_json_medication_response] start")
    # Remove the code block syntax if included in the response
    # Find the JSON block within the backticks
    start_index = json_response.find('```json') + 7  # Find the start of JSON block, add 7 to skip '```json'
    end_index = json_response.find('```', start_index)  # Find the end of JSON block

    json_response = json_response[start_index:end_index].strip()
    print("[parse_json_medication_response] json_response")
    print(json_response)

    try:
        # Parse the JSON data from the response
        json_data = json.loads(json_response)
        ingredients = json_data.get(target, []) 
        suggestions = [IngredientSuggestion(name=ingredient['name'], reason=ingredient['reason'], side_effect=ingredient['side_effect']) for ingredient in ingredients]
        return suggestions
    except json.JSONDecodeError as e:
        print(f"Failed to decode JSON: {e}")
        return []
