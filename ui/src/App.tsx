import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/home"
import Login from "@/pages/login"
import System from "@/pages/system"
import ProtectedRoute from "@/lib/protected-routes"
import Layout from "@/components/Layout"
import LLMResponsesProvider from "./components/store/LLMResponsesProvider";

function App() {

  return (
    <LLMResponsesProvider>
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />} >
            <Route path="/system" element={<System />} />
          </Route>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
    </LLMResponsesProvider>
  )
}

export default App
