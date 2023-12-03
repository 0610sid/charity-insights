import { Outlet, Navigate } from "react-router-dom"
import {jwtDecode} from 'jwt-decode'

const NgoRoutes = () => {

    const returnrole = (reqtoken) => {
        try {
            if (reqtoken) {
                var decoded = jwtDecode(reqtoken)
                return (decoded.role)
            }
            else {
                return (null)
            }    
        } catch (error) {
            return (null)
        }
    }

    const returnverf = (reqtoken) => {
        try {
            if (reqtoken) {
                var decoded = jwtDecode(reqtoken)
                return (decoded.verify)
            }
            else {
                return (null)
            }    
        } catch (error) {
            return (null)
        }
    }

    var role = returnrole(localStorage.getItem("Token"))
    var verification = returnverf(localStorage.getItem("Token"))

  return (
    (localStorage.getItem("Token") && role === 'Ngo') ? ( verification ? <Outlet /> : <Navigate to="/verification" />) : <Navigate to="/login" />
  )
}

export default NgoRoutes