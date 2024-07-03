type Diagnosis = {
    icd_10_code: string;
    english_name: string;
    chinese_name: string;
};

type AutocompleteDiagnosisDTO = {
    diagnosis: {
        icd_10_code: string;
        english_name: string;
        chinese_name: string;
    }[];
    message: string;
};

type AutocompleteDiagnosisInfo = {
    id: string;
    english_name: string;
    chinese_name: string;
};
