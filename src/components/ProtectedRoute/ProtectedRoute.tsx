import type { ReactNode } from "react"
import { useAuthStore } from "../../stores/useAuthStore"
import { Navigate } from "react-router-dom"

type ProtectedRouteProps = {
    children: ReactNode
  }

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const isAuth =  useAuthStore(state => state.isAuthenticated())
    return isAuth ? children : <Navigate to='/login' />
}

export default ProtectedRoute