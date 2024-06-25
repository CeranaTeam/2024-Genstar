import re

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

