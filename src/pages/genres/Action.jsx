// ============================================================
// 💥 액션 장르 페이지 (강사 사전 제공)
// ============================================================

// 실습#6 TODO 1: 아래 import 주석을 해제하세요
// import { Link } from 'react-router-dom'
import { getMoviesByGenre } from '../../data/movies'
import MovieCard from '../../components/MovieCard'
import styles from '../../styles/layout.module.css'

function Action() {
  const items = getMoviesByGenre('action')

  return (
    <div className={styles.cardGrid}>
      {items.map((movie) => (
        // 실습#6 TODO 2: 아래 <MovieCard /> 를 <Link to={`/movies/${movie.id}`}>...</Link> 로 감싸세요
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default Action
