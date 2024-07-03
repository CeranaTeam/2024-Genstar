type IngredientInfo = {
  name: string;
  quantity: string;
  unit: string;
}

type DrugDTO = {
  drug_name: string;
  drug_code: string;
  drug_std_qty: string;
  drug_std_unit: null;
  drug_dosage: string;
  drug_compound: string;
  drug_ings: {
    ing_name: string;
    ing_qty: string;
    ing_unit: string;
  }[];

  drug_classify_name: string;
  druggist_name: string;
  atc_code: string;
}

type AutocompleteDrugInfo = {
  name: string;
  id: string;
  std_qty: string;
  std_unit: string | null;
  dosage: string;
  compound: string;
  ingredients: IngredientInfo[];
  classify_name: string;
  manufacturer: string;
};