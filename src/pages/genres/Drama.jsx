// ============================================================
// 🎭 드라마 장르 페이지 (강사 사전 제공)
// ------------------------------------------------------------
// 실습#6에서 학생이 MovieCard 주변에 <Link>를 둘러 상세로 이동시킵니다.
// 그 TODO는 이 파일에서 처리하세요.
// ============================================================

// 실습#6 TODO 1: 아래 import 주석을 해제하세요
// import { Link } from 'react-router-dom'
import { getMoviesByGenre } from '../../data/movies'
import MovieCard from '../../components/MovieCard'
import styles from '../../styles/layout.module.css'

function Drama() {
  const items = getMoviesByGenre('drama')

  return (
    <div className={styles.cardGrid}>
      {items.map((movie) => (
        // 실습#6 TODO 2: 아래 <MovieCard /> 를 <Link to={`/movies/${movie.id}`}>...</Link> 로 감싸세요
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default Drama
