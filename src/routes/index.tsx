import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import LoginPage from '../pages/LoginPage/LoginPage'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'


const router = createBrowserRouter([
  {
    path: '/',
    element:<ProtectedRoute> <HomePage /> </ProtectedRoute>,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
])

export default router
