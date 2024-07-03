from abc import ABC, abstractmethod
from app.core.entity.medical import DrugRequestPayload, DrugInfo

class DrugService(ABC):
    @abstractmethod
    def __init__(self):
        pass

    @abstractmethod
    def get_drug_info(self, payload: DrugRequestPayload) -> list[DrugInfo]:
          pass
