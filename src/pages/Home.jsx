// ============================================================
// 🏠 홈 페이지 (강사 사전 제공 — 내부는 건드리지 마세요)
// ------------------------------------------------------------
// - 실습#2 체감 실험용 카운터 포함 (페이지 전환 시 상태 유지 확인)
// - 실습#4에서 "영화 구경하기" 버튼의 onClick 만 학생이 작성
// ============================================================

import { useState } from 'react'
// 실습#4에서 아래 import 주석을 해제하세요
// import { useNavigate } from 'react-router-dom'
import styles from '../styles/layout.module.css'

function Home() {
  const [count, setCount] = useState(0)
  // 실습#4 TODO: const navigate = useNavigate()

  function handleGoMovies() {
    // 실습#4 TODO: navigate('/movies') 를 호출해 영화 페이지로 이동시키세요
    alert('아직 이동 로직이 없습니다. 실습#4에서 useNavigate로 채우세요.')
  }

  return (
    <section>
      <h1 className={styles.pageTitle}>🎬 CineLog에 오신 걸 환영합니다</h1>
      <p>나만의 영화/드라마 리뷰 아카이브</p>

      <div style={{ margin: '24px 0' }}>
        <button
          className={`${styles.button} ${styles.buttonSecondary}`}
          onClick={() => setCount((c) => c + 1)}
        >
          카운트: {count}
        </button>
        <small style={{ marginLeft: 12, color: '#888' }}>
          (실습#2: 다른 페이지로 이동 후 돌아와도 이 숫자가 유지되는지 확인)
        </small>
      </div>

      <button className={styles.button} onClick={handleGoMovies}>
        영화 구경하러 가기 →
      </button>
    </section>
  )
}

export default Home
