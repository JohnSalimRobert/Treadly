import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'
import SignupPage from '../pages/SignupPage/SignupPage'
import AppLayout from '../components/Layouts/AppLayout'
import PostFeed from '../pages/PostFeed/PostFeed'
import ProfilePage from '../pages/Profile/ProfilePage';


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <PostFeed />,
      },
      {
        path: '/profile',
        element: <ProfilePage />
      }
    ],
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
