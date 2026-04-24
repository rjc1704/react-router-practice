// ============================================================
// 🙈 404 페이지 (강사 사전 제공)
// ------------------------------------------------------------
// 학생은 App.jsx 에 <Route path="*" element={<NotFound />} /> 만
// 가장 마지막에 추가하면 됩니다. (실습#7)
// ============================================================

import { Link } from 'react-router-dom'
import styles from '../styles/layout.module.css'

function NotFound() {
  return (
    <section className={styles.empty}>
      <div className={styles.emptyTitle}>404</div>
      <h1>페이지를 찾을 수 없습니다</h1>
      <p>주소가 잘못되었거나 삭제된 페이지입니다.</p>
      <p style={{ marginTop: 20 }}>
        <Link to="/" className={styles.button} style={{ textDecoration: 'none' }}>
          홈으로 돌아가기
        </Link>
      </p>
    </section>
  )
}

export default NotFound
