import { Navigate, useLocation } from 'react-router-dom'
import { isLoggedIn } from '../lib/auth'

function ProtectedRoute({ children }) {
  const location = useLocation()

  if (!isLoggedIn()) {
    // 로그인 후 원래 가려던 경로로 돌려보내기 위해 location 을 state 에 담아 전달
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute
