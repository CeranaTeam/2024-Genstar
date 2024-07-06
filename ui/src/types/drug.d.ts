type IngredientInfo = {
  name: string;
  quantity: string;
  unit: string;
}

type DrugsDTO = {
  drugs: {
    drug_name: string;
    drug_code: string;
    drug_std_qty: string;
    drug_std_unit: null;
    drug_ings: {
      ing_name: string;
      ing_qty: string;
      ing_unit: string;
    }[];
    drug_classify_name: string;
    drug_dose: string;
    druggist_name: string;
    atc_code: string;
    mixture: string;
  }[];
  message: string;
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

type IngredientsDTO = {
  ingredient_suggestions: {
    name: string;
    reason: string;
    side_effect: string;
  }[];
  message: string;
};
