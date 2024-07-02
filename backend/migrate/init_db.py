from sqlalchemy import create_engine, Column, String
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
import pandas as pd

df = pd.read_excel('ICD-10-CM-2023.xlsx')
print(df.head())

Base = declarative_base()

class Disease(Base):
    __tablename__ = 'diseases'
    id = Column(String, primary_key=True)
    english_name = Column(String)
    chinese_name = Column(String)

DATABASE_URL = "postgresql://mauser:mapassword@localhost:5432/madatabase"

engine = create_engine(DATABASE_URL)
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

# 進行數據轉存
for index, row in df.iterrows():
    disease = Disease(id=row['ICD-10-CM'], english_name=row['2023 CM英文名稱'], chinese_name=row['2023 CM中文名稱'])
    session.merge(disease)
session.commit()
