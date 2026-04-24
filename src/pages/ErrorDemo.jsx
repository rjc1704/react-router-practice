// ============================================================
// 🚨 에러 데모 페이지 — 실습#4 useNavigate 연습용
// ------------------------------------------------------------
// 학생 TODO:
//   1) useNavigate 를 import
//   2) handleGoHome 안에서 navigate('/') 호출
// ============================================================

// 실습#4 TODO 1: 아래 주석을 해제하세요
// import { useNavigate } from 'react-router-dom'
import styles from '../styles/layout.module.css'

function ErrorDemo() {
  // 실습#4 TODO 2: const navigate = useNavigate()

  function handleGoHome() {
    // 실습#4 TODO 3: navigate('/') 로 홈으로 이동시키세요
    alert('아직 홈 이동 로직이 없습니다. 실습#4의 useNavigate로 채우세요.')
  }

  return (
    <section className={styles.empty}>
      <div className={styles.emptyTitle}>😵</div>
      <h1>무언가 잘못됐습니다</h1>
      <p>홈으로 돌아가서 다시 시도해 주세요.</p>
      <button className={styles.button} onClick={handleGoHome}>
        홈으로 가기
      </button>
    </section>
  )
}

export default ErrorDemo
