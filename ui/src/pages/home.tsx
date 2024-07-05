import DiagnoseTextAreas from "@/components/system/DiagnoseTextAreas"
import LLMResponseTables from "@/components/system/LLMResponseTables"
import SummarySection from "@/components/system/SummarySection";
import SelectedSymptomsDrugsProvider from "@/components/store/SelectedSymptomsDrugsProvider";

function Home() {
  return (
    <>
      <DiagnoseTextAreas />
      <SelectedSymptomsDrugsProvider>
        <LLMResponseTables />
        <SummarySection />
      </SelectedSymptomsDrugsProvider>
    </>
  );
}

export default Home
