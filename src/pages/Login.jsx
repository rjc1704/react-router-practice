// ============================================================
// 🔐 로그인 페이지 (실습#7)
// ------------------------------------------------------------
// 학생 TODO:
//   1) useNavigate import
//   2) handleLogin 에서 auth.login() + navigate('/mypage', { replace: true })
//
// 도전 과제 (실습#8): location.state.from.pathname 으로 원래 가려던 경로로 복귀
// ============================================================

// 실습#7 TODO 1: useNavigate 를 import 하세요
// import { useNavigate, useLocation } from 'react-router-dom'
import * as auth from '../lib/auth'
import styles from '../styles/layout.module.css'

function Login() {
  // 실습#7 TODO 2: const navigate = useNavigate()
  // 실습#8 도전 과제: const location = useLocation()
  //                   const from = location.state?.from?.pathname ?? '/mypage'

  function handleLogin() {
    auth.login()
    // 실습#7 TODO 3: navigate('/mypage', { replace: true }) 로 이동
    //   (도전 과제: navigate(from, { replace: true }) 로 바꾸기)
    alert('로그인되었습니다. (실습#7 TODO 3 에서 navigate 호출을 추가하세요)')
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
