import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/layout.module.css'

function Home() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  function handleGoMovies() {
    navigate('/movies')
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
          (다른 페이지로 이동 후 돌아와도 이 숫자가 유지됩니다 — SPA의 특징)
        </small>
      </div>

      <button className={styles.button} onClick={handleGoMovies}>
        영화 구경하러 가기 →
      </button>
    </section>
  )
}

export default Home
