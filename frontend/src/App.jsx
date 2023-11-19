import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./components/Home"
import Login from "./components/Login"
import Error404 from "./components/Error404"
import Dashboard from "./components/Dashboard"
import Signup from './components/SignUp'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
