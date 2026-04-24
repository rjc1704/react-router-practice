// ============================================================
// 🎬 영화 상세 페이지 (실습#6 useParams)
// ------------------------------------------------------------
// 학생 TODO:
//   1) useParams 를 import
//   2) { movieId } = useParams() 로 URL 파라미터 꺼내기
//   3) findMovieById(movieId) 로 영화 조회
//
// 나머지 JSX/스타일은 모두 완성 상태입니다.
// ============================================================

// 실습#6 TODO 1: 'react-router-dom' 에서 useParams, useNavigate 를 import 하세요
// import { useParams, useNavigate } from 'react-router-dom'
import { findMovieById } from '../data/movies'
import styles from '../styles/layout.module.css'

function MovieDetail() {
  // 실습#6 TODO 2: URL 의 :movieId 파라미터를 꺼내세요
  // const { movieId } = useParams()
  const movieId = null // ← 위 줄로 교체

  // 실습#6 TODO 3: 조회된 영화를 movie 에 담으세요
  const movie = findMovieById(movieId)

  // (도전 과제) 실습#6: const navigate = useNavigate() 로 뒤로가기 버튼 만들기

  if (!movie) {
    return (
      <section className={styles.empty}>
        <div className={styles.emptyTitle}>🤷</div>
        <h1>영화를 찾을 수 없습니다</h1>
        <p>URL 의 movieId 가 올바른지 확인하세요.</p>
      </section>
    )
  }

  return (
    <section className={styles.detail}>
      <div className={styles.detailPoster}>{movie.poster}</div>
      <div>
        <h1 className={styles.detailTitle}>{movie.title}</h1>
        <p className={styles.detailMeta}>
          {movie.year} · ⭐ {movie.rating} · {movie.genre}
        </p>
        <p className={styles.detailSummary}>{movie.summary}</p>

        {/* 도전 과제: navigate(-1) 로 뒤로 가는 버튼
        <button
          className={`${styles.button} ${styles.buttonSecondary}`}
          style={{ marginTop: 20 }}
          onClick={() => navigate(-1)}
        >
          ← 뒤로
        </button>
        */}
      </div>
    </section>
  )
}

export default MovieDetail
