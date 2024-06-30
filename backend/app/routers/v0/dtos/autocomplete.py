from pydantic import BaseModel, Field
from app.core.entity import Suggestion

class AutocompleteIngredientRequest(BaseModel):
    context: str = Field(example="""47歲男性，兩個月前有疲倦、食慾不振等症狀。最近皮膚、眼睛及小便皆呈深黃色，下肢嚴重水腫，無法穿鞋、工作，腹部嚴重腫脹、皮膚有多處瘀青、體重由65 kg增至75 kg。平常工作認真、煙酒不沾。媽媽、爸爸、哥哥、太太、女兒皆有B型肝炎。爸爸及哥哥因肝硬化、肝癌已經在醫院病逝。鞏膜偏黃(Icteric sclera)、腹部外觀呈圓狀、脾臟腫大 (Splenomegaly)、有腹水(Ascites)、下肢水腫(Edema)、皮膚有多處瘀青(Ecchymosis)、意識清醒，實驗室檢驗結果如下:Anti-HAV IgM: negative、HBS Ag: positive、HBE Ag: positive、Anti-HCV: negative、AFP: 16、周邊血液: Hemoglobin 9.8 gm/dL、Platelet 89000 ul/L、Glucose 145 mg/dL、BUN 14 mg/dL、Creatinine 0.7 mg/dL、Sodium 130 mmol/L、GOT 190 U/L、GPT 240 U/L、Total bilirubin 8.1mg/dL、Direct bilirubin 4.8mg/dL、Albumin 2.8 gm/dL、PT 16.2/11.2，請問該男性可能有甚麼問題，應該如何處置?""")

class AutocompleteIngredientResponse(BaseModel):
    ingredient_suggestions: list[Suggestion]
    message: str

class AutocompleteDiagnosisRequest(BaseModel):
    context: str = Field(example="""47歲男性，兩個月前有疲倦、食慾不振等症狀。最近皮膚、眼睛及小便皆呈深黃色，下肢嚴重水腫，無法穿鞋、工作，腹部嚴重腫脹、皮膚有多處瘀青、體重由65 kg增至75 kg。平常工作認真、煙酒不沾。媽媽、爸爸、哥哥、太太、女兒皆有B型肝炎。爸爸及哥哥因肝硬化、肝癌已經在醫院病逝。鞏膜偏黃(Icteric sclera)、腹部外觀呈圓狀、脾臟腫大 (Splenomegaly)、有腹水(Ascites)、下肢水腫(Edema)、皮膚有多處瘀青(Ecchymosis)、意識清醒，實驗室檢驗結果如下:Anti-HAV IgM: negative、HBS Ag: positive、HBE Ag: positive、Anti-HCV: negative、AFP: 16、周邊血液: Hemoglobin 9.8 gm/dL、Platelet 89000 ul/L、Glucose 145 mg/dL、BUN 14 mg/dL、Creatinine 0.7 mg/dL、Sodium 130 mmol/L、GOT 190 U/L、GPT 240 U/L、Total bilirubin 8.1mg/dL、Direct bilirubin 4.8mg/dL、Albumin 2.8 gm/dL、PT 16.2/11.2，請問該男性可能有甚麼問題，應該如何處置?""")

class AutocompleteDiagnosisResponse(BaseModel):
    diagnosis_suggestions: list[Suggestion]
    message: str

