import unittest
from app.utils.parse import parse_suggestions
from app.core.entity import Suggestion

class TestParsingFunctions(unittest.TestCase):
    def test_parse_suggestions(self):
        json_response = """
        asdasdasd

        ```json
        {
            "symptoms": [
                {
                    "icd_10_code": "R05",
                    "name": "Cough",
                    "reason": "Inferred cause based on current diagnosis of 咳嗽 (cough) and absence of detailed medical history or lab results."
                },
                {
                    "icd_10_code": "R50.9",
                    "name": "Fever, unspecified",
                    "reason": "Inferred cause based on current diagnosis of 發燒 (fever) and absence of detailed medical history or lab results."
                }
            ]
        }
        ```

        asdasdasd
        """
        expected_result = [
            Suggestion(name="Cough", reason="Inferred cause based on current diagnosis of 咳嗽 (cough) and absence of detailed medical history or lab results."),
            Suggestion(name="Fever, unspecified", reason="Inferred cause based on current diagnosis of 發燒 (fever) and absence of detailed medical history or lab results.")
        ]
        result = parse_suggestions("symptoms", json_response)
        self.assertEqual(result, expected_result)

