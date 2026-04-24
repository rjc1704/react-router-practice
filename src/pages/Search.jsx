// ============================================================
// 🔍 검색 페이지 (실습#8 useSearchParams)
// ------------------------------------------------------------
// 학생 TODO:
//   1) useSearchParams import + 호출
//   2) q, genre 읽기 (.get)
//   3) 장르 버튼 클릭 시 setSearchParams 로 URL 갱신 (기존 q 유지!)
//
// 나머지 필터링/렌더 로직은 완성 상태입니다.
// ============================================================

// 실습#8 TODO 1: useSearchParams 를 import 하세요
// import { useSearchParams } from 'react-router-dom'
import { movies } from '../data/movies'
import MovieCard from '../components/MovieCard'
import styles from '../styles/layout.module.css'

const GENRES = [
  { key: 'all', label: '전체' },
  { key: 'drama', label: '드라마' },
  { key: 'action', label: '액션' },
  { key: 'romance', label: '로맨스' },
]

function Search() {
  // 실습#8 TODO 2: useSearchParams 로 [searchParams, setSearchParams] 를 받으세요
  // const [searchParams, setSearchParams] = useSearchParams()
  const searchParams = new URLSearchParams() // ← 위 줄로 교체
  const setSearchParams = () => {}           // ← 위 줄로 교체

  // 실습#8 TODO 3: searchParams.get('q'), searchParams.get('genre') 로 값을 꺼내세요
  const q = searchParams.get('q') ?? ''
  const genre = searchParams.get('genre') ?? 'all'

  const filtered = movies.filter((m) => {
    const hit = q === '' || m.title.includes(q)
    const ok = genre === 'all' || m.genre === genre
    return hit && ok
  })

  function handleGenreChange(newGenre) {
    // 실습#8 TODO 4: 기존 q 를 유지하면서 genre 만 갱신하세요
    //   setSearchParams({ q, genre: newGenre })
    alert('setSearchParams 를 호출해 URL 을 갱신하세요 (실습#8 TODO 4)')
  }

  return (
    <section>
      <h1 className={styles.pageTitle}>🔍 검색 결과</h1>
      <p>
        "<b>{q || '(검색어 없음)'}</b>" — 총 {filtered.length}편
      </p>

      <div style={{ display: 'flex', gap: 8, margin: '16px 0' }}>
        {GENRES.map((g) => (
          <button
            key={g.key}
            className={`${styles.button} ${genre === g.key ? '' : styles.buttonSecondary}`}
            onClick={() => handleGenreChange(g.key)}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className={styles.cardGrid}>
        {filtered.map((m) => <MovieCard key={m.id} movie={m} />)}
      </div>
    </section>
  )
}

export default Search
