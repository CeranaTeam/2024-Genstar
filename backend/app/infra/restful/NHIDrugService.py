import requests
from pydantic import BaseModel

url = "https://info.nhi.gov.tw/api/INAE3000/INAE3000S01/SQL0001"

headers = {
    "Content-Type": "application/json"
}

class DrugRequestPayload(BaseModel):
    ing_name: str

class DrugIngrediant(BaseModel):
    ing_name: str
    ing_qty: str
    ing_unit: str

class DrugResponse(BaseModel):
    drug_name: str
    drug_code: str
    drug_std_qty: str
    drug_std_unit: str
    drug_ings: list[DrugIngrediant]
    drug_classify_name: str
    druggist_name: str
    atc_code: str

def get_drug_info(payload: DrugRequestPayload) -> DrugResponse:
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    json = response.json()

    # mapping the response data to the DrugResponse model
    drug_ings = []
    for i in range(1, 6):
        ing_name = json.get(f"druG_ING_{i}")
        if not ing_name:
            break
        ing_qty = json[f"druG_ING_{i}_QTY"]
        ing_unit = json[f"druG_ING_{i}_UNIT"]
        drug_ings.append(DrugIngrediant(ing_name=ing_name, ing_qty=ing_qty, ing_unit=ing_unit))

    return DrugResponse(
            drug_name=json["druG_NAME"],
            drug_code=json["druG_CODE"],
            drug_std_qty=json["druG_STD_QTY"],
            drug_std_unit=json["druG_STD_UNIT"],
            drug_ings=drug_ings,
            drug_classify_name=json["druG_CLASSIFY_NAME"],
            druggist_name=json["druGGIST_NAME"],
            atc_code=json["aT_CODE"]
    )


if __name__ == "__main__":
    payload = {
        "ATC_CODE": "",
        "CURPAGE": 1,
        "DRUGGIST_NAME": "",
        "DRUG_CLASSIFY_NAME": "",
        "DRUG_CODE": "",
        "DRUG_DOSE": "",
        "DRUG_ING": "",
        "DRUG_ING_QTY": "",
        "DRUG_ING_UNIT": "",
        "DRUG_NAME": "",
        "DRUG_STD_QTY": "",
        "DRUG_STD_UNIT": "",
        "MIXTURE": "",
        "ORAL_TYPE": "",
        "PAGESIZE": 10,
        "PAY_START_DATE_MON": "",
        "PAY_START_DATE_YEAR": "",
        "SHOWTYPE": "Y"
    }

    response = requests.post(url, json=payload, headers=headers)

    # Print the status code and response data
    print("Status Code:", response.status_code)
    print("Response Body:", response.json())
