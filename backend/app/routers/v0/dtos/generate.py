from pydantic import BaseModel, Field
from app.core.entity import Suggestion

class GenerateIngredientRequest(BaseModel):
    context: str = Field(examples=[
        """47歲男性，兩個月前有疲倦、食慾不振等症狀。最近皮膚、眼睛及小便皆呈深黃色，下肢嚴重水腫，無法穿鞋、工作，腹部嚴重腫脹、皮膚有多處瘀青、體重由65 kg增至75 kg。平常工作認真、煙酒不沾。媽媽、爸爸、哥哥、太太、女兒皆有B型肝炎。爸爸及哥哥因肝硬化、肝癌已經在醫院病逝。鞏膜偏黃(Icteric sclera)、腹部外觀呈圓狀、脾臟腫大 (Splenomegaly)、有腹水(Ascites)、下肢水腫(Edema)、皮膚有多處瘀青(Ecchymosis)、意識清醒，實驗室檢驗結果如下:Anti-HAV IgM: negative、HBS Ag: positive、HBE Ag: positive、Anti-HCV: negative、AFP: 16、周邊血液: Hemoglobin 9.8 gm/dL、Platelet 89000 ul/L、Glucose 145 mg/dL、BUN 14 mg/dL、Creatinine 0.7 mg/dL、Sodium 130 mmol/L、GOT 190 U/L、GPT 240 U/L、Total bilirubin 8.1mg/dL、Direct bilirubin 4.8mg/dL、Albumin 2.8 gm/dL、PT 16.2/11.2，請問該男性可能有甚麼問題，應該如何處置?""",
        """23歲男性，出遊時出車禍，救護人員回報病人在救護車上抱怨吸不到氣且僅不合胸部有傷口疼痛，到院後發現顏面，四肢及胸部有多處擦挫傷，下巴及頸部有撕裂傷及出血但是經過紗布加壓已經速度減緩，意識清楚眼睛可自行張開，手腳活動自如，回答問題時焦躁、聲音非常微弱且持續咳嗽，抽吸分泌物中有少量鮮血，脖子跟胸口疼痛不已，GCS:E4M6V5，體溫36.8度，脈搏105次/min，呼吸24/min，SpO2 97%，血壓116/68mmHg，呼吸音清楚右側>左側，頸部及前胸觸診有crepitus，手肘及膝蓋有擦傷，無腫脹變形，頸部傷口中有微弱冒泡聲響。氣管位置無偏移，無頸靜脈鼓脹，無顫抖或冒冷汗。腹部無鼓脹、壓痛或反彈痛，血液檢驗：WBC 7600/uL, Hb 14.8g/dL, HCT 45%, PLT 235000/uL，支氣管檢查發現氣管內有血塊及分泌物影響視線，但可以見到前方軟骨破損約在 carina 上方 5 公分處，斷層掃描檢查除左側氣胸之外有大量縱膈腔及皮下氣腫，在病人回到急救區時，病人出現冒冷汗及心跳加速(120/min)情形，身體檢查左側呼吸音完全消失"""
])

class GenerateIngredientResponse(BaseModel):
    ingredient_suggestions: list[Suggestion]
    message: str

class GenerateDiagnosisRequest(BaseModel):
    context: str = Field(examples=[
        """47歲男性，兩個月前有疲倦、食慾不振等症狀。最近皮膚、眼睛及小便皆呈深黃色，下肢嚴重水腫，無法穿鞋、工作，腹部嚴重腫脹、皮膚有多處瘀青、體重由65 kg增至75 kg。平常工作認真、煙酒不沾。媽媽、爸爸、哥哥、太太、女兒皆有B型肝炎。爸爸及哥哥因肝硬化、肝癌已經在醫院病逝。鞏膜偏黃(Icteric sclera)、腹部外觀呈圓狀、脾臟腫大 (Splenomegaly)、有腹水(Ascites)、下肢水腫(Edema)、皮膚有多處瘀青(Ecchymosis)、意識清醒，實驗室檢驗結果如下:Anti-HAV IgM: negative、HBS Ag: positive、HBE Ag: positive、Anti-HCV: negative、AFP: 16、周邊血液: Hemoglobin 9.8 gm/dL、Platelet 89000 ul/L、Glucose 145 mg/dL、BUN 14 mg/dL、Creatinine 0.7 mg/dL、Sodium 130 mmol/L、GOT 190 U/L、GPT 240 U/L、Total bilirubin 8.1mg/dL、Direct bilirubin 4.8mg/dL、Albumin 2.8 gm/dL、PT 16.2/11.2，請問該男性可能有甚麼問題，應該如何處置?""",
        """23歲男性，出遊時出車禍，救護人員回報病人在救護車上抱怨吸不到氣且僅不合胸部有傷口疼痛，到院後發現顏面，四肢及胸部有多處擦挫傷，下巴及頸部有撕裂傷及出血但是經過紗布加壓已經速度減緩，意識清楚眼睛可自行張開，手腳活動自如，回答問題時焦躁、聲音非常微弱且持續咳嗽，抽吸分泌物中有少量鮮血，脖子跟胸口疼痛不已，GCS:E4M6V5，體溫36.8度，脈搏105次/min，呼吸24/min，SpO2 97%，血壓116/68mmHg，呼吸音清楚右側>左側，頸部及前胸觸診有crepitus，手肘及膝蓋有擦傷，無腫脹變形，頸部傷口中有微弱冒泡聲響。氣管位置無偏移，無頸靜脈鼓脹，無顫抖或冒冷汗。腹部無鼓脹、壓痛或反彈痛，血液檢驗：WBC 7600/uL, Hb 14.8g/dL, HCT 45%, PLT 235000/uL，支氣管檢查發現氣管內有血塊及分泌物影響視線，但可以見到前方軟骨破損約在 carina 上方 5 公分處，斷層掃描檢查除左側氣胸之外有大量縱膈腔及皮下氣腫，在病人回到急救區時，病人出現冒冷汗及心跳加速(120/min)情形，身體檢查左側呼吸音完全消失"""
    ])

class GenerateDiagnosisResponse(BaseModel):
    diagnosis_suggestions: list[Suggestion]
    message: str

