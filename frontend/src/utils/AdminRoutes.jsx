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


    var role = returnrole(localStorage.getItem("Token"))

  return (
    (localStorage.getItem("Token") && role === 'Admin') ? <Outlet /> : <Navigate to="/admin/login" />
  )
}

export default NgoRoutes