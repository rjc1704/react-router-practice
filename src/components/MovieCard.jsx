// ============================================================
// 🎬 영화 카드 컴포넌트 (강사 사전 제공)
// ------------------------------------------------------------
// 실습#5에서는 이 카드를 목록에 나열하는 용도로 사용합니다.
// 실습#6에서 이 카드를 <Link>로 감싸 상세 페이지로 이동하게 만듭니다.
//
// Props:
//   movie: { id, title, genre, year, rating, poster, summary }
// ============================================================

import styles from '../styles/layout.module.css'

function MovieCard({ movie }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardPoster}>{movie.poster}</div>
      <h3 className={styles.cardTitle}>{movie.title}</h3>
      <p className={styles.cardMeta}>
        {movie.year} · ⭐ {movie.rating}
      </p>
    </article>
  )
}

export default MovieCard
