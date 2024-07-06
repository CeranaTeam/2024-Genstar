import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/home"
//import Login from "@/pages/login"
//import ProtectedRoute from "@/lib/protected-routes"
import Layout from "@/components/Layout"
import LLMResponsesProvider from "./store/LLMResponsesProvider";

function App() {

  return (
    <LLMResponsesProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </LLMResponsesProvider>
  )
}

export default App
