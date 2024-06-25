import re

def parse_out_all_between_square_brackets(text):
    return re.findall(r'\[(.*?)\]', text)
