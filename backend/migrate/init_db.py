import os
from sqlalchemy import create_engine, Column, String, text
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
import pandas as pd
# from dotenv import load_dotenv

# load_dotenv()

df = pd.read_excel('ICD-10-CM-2023.xlsx')
print(df.head())

Base = declarative_base()

class Disease(Base):
    __tablename__ = 'diseases'
    id = Column(String, primary_key=True)
    english_name = Column(String)
    chinese_name = Column(String)

DATABASE_URL = os.getenv('POSTGRES_URL')
if DATABASE_URL is None:
    raise ValueError('DATABASE_URL is not set')

engine = create_engine(DATABASE_URL)
# 安裝 pg_trgm 擴展
with engine.connect() as conn:
    conn.execute(text("CREATE EXTENSION IF NOT EXISTS pg_trgm;"))
    conn.commit()
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

# 進行數據轉存
for index, row in df.iterrows():
    disease = Disease(id=row['ICD-10-CM'], english_name=row['2023 CM英文名稱'], chinese_name=row['2023 CM中文名稱'])
    session.merge(disease)
session.commit()
