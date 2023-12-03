import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./components/Home"
import Login from "./components/NgoLogin"
import Error404 from "./components/Error404"
import Dashboard from "./components/Dashboard"
import Signup from './components/NgoSignUp'
import Analaytics from './components/Analytics'
import NgoDets from './components/NgoDets'
import AdminDashboard from './components/AdminDashboard'
import AdminLogin from './components/AdminLogin'
import Verification from './components/Verification'

import NgoRoutes from './utils/NgoRoutes'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<NgoRoutes/>}>
            <Route path="/analytics" element={<Analaytics/>}/>
          </Route>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
          <Route path='/admin/login' element={<AdminLogin/>}/>
          <Route path='/ngodeets' element={<NgoDets/>}/>
          <Route path='/verification' element={<Verification/>}/>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
