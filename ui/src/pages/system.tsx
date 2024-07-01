import AutoCompleteTextArea from "@/components/system/AutoCompleteTextArea"
import DiagnoseTextArea from "@/components/system/DiagnoseTextArea"
import LLMResponseTextAreas from "@/components/system/LLMResponseTextAreas"
import SelectedDrugsTable from "@/components/system/SelectedDrugsTable"

function System() {

  return (
    <>
      <DiagnoseTextArea />
      <LLMResponseTextAreas />
      <SelectedDrugsTable />
      <AutoCompleteTextArea />
      {/* <Button /> */}
    </>
  )
}

export default System
