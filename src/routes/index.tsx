import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import LoginPage from '../pages/LoginPage/LoginPage'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'
import SignupPage from '../pages/SignupPage/SignupPage'


const router = createBrowserRouter([
  {
    path: '/',
    element:<ProtectedRoute> <HomePage /> </ProtectedRoute>,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
])

export default router
