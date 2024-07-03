from abc import ABC, abstractmethod
from app.core.entity import DiseaseInfo

class CMRepo(ABC):
    def __init__(self):
        pass

    @abstractmethod
    def search_similar_diseases(self, english_name: str, limit=5) -> list[DiseaseInfo]:
        pass
