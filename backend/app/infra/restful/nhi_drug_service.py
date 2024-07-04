import requests
from app.core.entity.medical import DrugRequestPayload, DrugIngrediant, DrugInfo
from app.core.repo.drug_service import DrugService

class NHIDrugService(DrugService):
    def __init__(self):
        self.url = "https://info.nhi.gov.tw/api/INAE3000/INAE3000S01/SQL0001"
        self.headers = {
                "Content-Type": "application/json"
        }

    def get_drug_info(self, payload: DrugRequestPayload) -> list[DrugInfo]:
        mapped_payload = {
            "ATC_CODE": "",
            "CURPAGE": payload.curpage,
            "DRUGGIST_NAME": "",
            "DRUG_CLASSIFY_NAME": "",
            "DRUG_CODE": "",
            "DRUG_DOSE": "",
            "DRUG_ING": payload.ing_name,
            "DRUG_ING_QTY": "",
            "DRUG_ING_UNIT": "",
            "DRUG_NAME": "",
            "DRUG_STD_QTY": "",
            "DRUG_STD_UNIT": "",
            "MIXTURE": "",
            "ORAL_TYPE": "",
            "PAGESIZE": payload.page_size,
            "PAY_START_DATE_MON": "",
            "PAY_START_DATE_YEAR": "",
            "SHOWTYPE": "Y"
        }
        response = requests.post(self.url, json=mapped_payload, headers=self.headers)
        response.raise_for_status()
        json = response.json()
        json = json["data"]

        results = []
        for drug in json:
        # mapping the response data to the DrugResponse model
            drug_ings = []

            ing_name = drug.get(f"druG_ING")
            ing_qty = drug[f"druG_ING_QTY"]
            ing_unit = drug[f"druG_ING_UNIT"]
            drug_ings.append(DrugIngrediant(ing_name=ing_name, ing_qty=ing_qty, ing_unit=ing_unit))

            for i in range(1, 6):
                ing_name = drug.get(f"druG_ING_{i}")
                if not ing_name:
                    break
                ing_qty = drug[f"druG_ING_{i}_QTY"]
                ing_unit = drug[f"druG_ING_{i}_UNIT"]
                drug_ings.append(DrugIngrediant(ing_name=ing_name, ing_qty=ing_qty, ing_unit=ing_unit))

            drug_info = DrugInfo(
                    drug_name=drug["druG_ENAME"],
                    drug_code=drug["druG_CODE"],
                    drug_std_qty=drug["druG_STD_QTY"],
                    drug_std_unit=drug["druG_STD_UNIT"],
                    drug_ings=drug_ings,
                    drug_classify_name=drug["druG_CLASSIFY_NAME"],
                    drug_dose=drug["druG_DOSE"],
                    druggist_name=drug["druggisT_NAME"],
                    atc_code=drug["atC_CODE"],
                    mixture=drug["mixture"],
            )
            results.append(drug_info)

        return results

if __name__ == "__main__":
    svc = NHIDrugService()
    payload = DrugRequestPayload(ing_name="stat", curpage=1, page_size=10)
    response = svc.get_drug_info(payload)

    # Print the status code and response data
    print("svc.get_drug_info(payload):", response)
