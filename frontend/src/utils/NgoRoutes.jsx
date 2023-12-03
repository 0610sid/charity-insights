import { Outlet, Navigate } from "react-router-dom"
import jwt_decode from 'jwt-decode'

const NgoRoutes = () => {

    const returnrole = (reqtoken) => {
        try {
            if (reqtoken) {
                var decoded = jwt_decode(reqtoken)
                return (decoded.note)
            }
            else {
                return (null)
            }    
        } catch (error) {
            return (null)
        }
        
    }

  return (
    <div>NgoRoutes</div>
  )
}

export default NgoRoutes