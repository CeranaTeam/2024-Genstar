import os
from app.core.repo.cm_repo import CMRepo
from app.core.entity import DiseaseInfo
from sqlalchemy import create_engine, text

class PGCMRepo(CMRepo):
    def __init__(self):
        db_url = os.getenv('POSTGRES_URL')
        if db_url is None:
            raise ValueError('db_url is not set')
        self.engine = create_engine(db_url)

    def search_similar_diseases(self, english_name: str, limit=5) -> list[DiseaseInfo]:
        similarity_query = text(
            "SELECT id, english_name, chinese_name, SIMILARITY(english_name, :name) AS sim "
            "FROM diseases WHERE english_name % :name "
            "ORDER BY sim DESC LIMIT :limit"
        )
        with self.engine.connect() as conn:
            result = conn.execute(similarity_query, {'name': english_name, 'limit': limit}).fetchall()

            return [DiseaseInfo(icd_10_code=row[0], english_name=row[1], chinese_name=row[2]) for row in result]
