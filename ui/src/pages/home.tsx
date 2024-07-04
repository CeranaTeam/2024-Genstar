import DiagnoseTextAreas from "@/components/system/DiagnoseTextAreas"
import LLMResponseTables from "@/components/system/LLMResponseTables"
import SummarySection from "@/components/system/SummarySection";

function Home() {
  return (
    <>
      <DiagnoseTextAreas />
      <LLMResponseTables />
      <SummarySection />
    </>
  );
}

export default Home
