// ============================================================
// 👤 마이페이지 (강사 사전 제공 — 보호된 라우트)
// ------------------------------------------------------------
// App.jsx 에서 <ProtectedRoute>로 감싸 등록하면 로그인 필요 페이지가 됩니다.
// 학생이 이 파일 자체를 고칠 필요는 없습니다.
// ============================================================

import { useNavigate } from 'react-router-dom'
import * as auth from '../lib/auth'
import styles from '../styles/layout.module.css'
import MovieCard from '../components/MovieCard'
import { movies } from '../data/movies'

// 데모용: 마이페이지에 임의로 "좋아요한 영화 3편"을 표시
const liked = movies.slice(0, 3)

function MyPage() {
  const navigate = useNavigate()

  function handleLogout() {
    auth.logout()
    navigate('/', { replace: true })
  }

  return (
    <section>
      <h1 className={styles.pageTitle}>👤 마이페이지</h1>
      <p>로그인한 사용자만 볼 수 있는 페이지입니다.</p>

      <h2 style={{ marginTop: 32 }}>내가 좋아요한 영화</h2>
      <div className={styles.cardGrid} style={{ marginTop: 12 }}>
        {liked.map((m) => <MovieCard key={m.id} movie={m} />)}
      </div>

      <button
        className={`${styles.button} ${styles.buttonSecondary}`}
        style={{ marginTop: 32 }}
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </section>
  )
}

export default MyPage
