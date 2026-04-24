// ============================================================
// 🎞️ 영화 페이지 — 실습#1에서만 단순히 사용됨
// ------------------------------------------------------------
// 실습#5부터는 이 페이지 대신 MoviesLayout.jsx 가 `/movies` 의
// element 로 등록됩니다. (App.jsx 의 Route 연결만 바꾸면 됨)
// ============================================================

import styles from '../styles/layout.module.css'

function Movies() {
  return (
    <section>
      <h1 className={styles.pageTitle}>🎞️ 영화 목록</h1>
      <p>실습#5에서 장르별 중첩 라우팅으로 확장됩니다.</p>
    </section>
  )
}

export default Movies
