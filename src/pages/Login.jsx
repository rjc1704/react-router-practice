import { useNavigate, useLocation } from 'react-router-dom'
import * as auth from '../lib/auth'
import styles from '../styles/layout.module.css'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  // 보호된 페이지에 접근하려다 튕긴 경우, ProtectedRoute 가 state.from 에 원래 경로를 담아 보냄.
  // 그 경로가 있으면 그곳으로, 없으면 기본으로 /mypage 로 이동.
  const from = location.state?.from?.pathname ?? '/mypage'

  function handleLogin() {
    auth.login()
    navigate(from, { replace: true })
  }

  return (
    <section>
      <h1 className={styles.pageTitle}>🔐 로그인</h1>
      <p>실습용 더미 로그인입니다. 버튼만 누르면 로그인 처리됩니다.</p>
      <button className={styles.button} onClick={handleLogin}>
        로그인하기
      </button>
    </section>
  )
}

export default Login
