import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/home"
import Login from "@/pages/login"
import System from "@/pages/system"
//import Navbar from "@/components/Navbar"
import ProtectedRoute from "@/lib/protected-routes"
import Layout from "@/components/Layout"

function App() {

  return (
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
  )
}

export default App
