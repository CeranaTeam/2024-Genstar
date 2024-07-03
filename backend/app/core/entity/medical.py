from pydantic import BaseModel

class DrugRequestPayload(BaseModel):
    ing_name: str
    curpage: int
    page_size: int

class DrugIngrediant(BaseModel):
    ing_name: str
    ing_qty: str
    ing_unit: str

class DrugInfo(BaseModel):
    drug_name: str
    drug_code: str
    drug_std_qty: str
    drug_std_unit: str | None
    drug_ings: list[DrugIngrediant]
    drug_classify_name: str
    druggist_name: str
    atc_code: str

class DiseaseInfo(BaseModel):
    icd_10_code: str
    english_name: str
    chinese_name: str
