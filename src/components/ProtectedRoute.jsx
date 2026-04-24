// ============================================================
// 🛡️ ProtectedRoute (실습#7)
// ------------------------------------------------------------
// 로그인이 안 된 사용자가 보호된 페이지에 접근하면
// /login 으로 리다이렉트시키는 래퍼 컴포넌트.
//
// 학생 TODO (짧아요! 핵심은 Navigate 컴포넌트 사용):
//   1) 'react-router-dom' 에서 Navigate 를 import
//   2) 로그인 상태가 아니면 <Navigate to="/login" replace /> 를 return
//   3) 로그인 상태면 children 을 그대로 return
// ============================================================

// 실습#7 TODO 1: Navigate 를 import 하세요
// import { Navigate } from 'react-router-dom'
import { isLoggedIn } from '../lib/auth'

function ProtectedRoute({ children }) {
  // 실습#7 TODO 2: 로그인 안 됐으면 <Navigate to="/login" replace /> 반환
  // if (!isLoggedIn()) {
  //   return <Navigate to="/login" replace />
  // }

  // 실습#7 TODO 3: 로그인 된 상태면 children 을 그대로 반환
  return children
}

export default ProtectedRoute
