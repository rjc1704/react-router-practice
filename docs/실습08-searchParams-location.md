# 실습#8 — useSearchParams + useLocation

> 관련 교안: **PART 5-3, 5-4. useSearchParams, useLocation**

## 🎯 학습 목표

**URL을 앱 상태의 source of truth로 삼는다** — 검색어/필터를 `useState`가 아닌 URL 쿼리스트링에 두면, 새로고침/뒤로가기/링크 공유가 자연스럽게 동작합니다. 이 감각을 체득합니다.

## 🗺️ URL 해부

```
  https://cinelog.com/search?q=오펜하이머&genre=drama#section1
  └─────┬──────┘└───┬──┘└────────────┬────────────┘└──┬───┘
      host      pathname          search              hash
```

| `useLocation()` 필드 | 값 |
|--------------------|-----|
| `pathname`         | `/search` |
| `search`           | `?q=오펜하이머&genre=drama` |
| `hash`             | `#section1` |
| `state`            | `navigate('/x', { state: ... })` 로 넘긴 데이터 |

## ✅ 구현 요구사항

### Part A — 검색 페이지

- [ ] `src/pages/Search.jsx` 생성. URL의 `q` 쿼리스트링을 읽어 영화 제목을 필터링
  ```jsx
  import { useSearchParams } from 'react-router-dom'
  import { movies } from '../data/movies'
  import MovieCard from '../components/MovieCard'

  function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    const q = searchParams.get('q') ?? ''
    const genre = searchParams.get('genre') ?? 'all'

    const filtered = movies.filter((m) => {
      const matchesQ = m.title.includes(q)
      const matchesGenre = genre === 'all' || m.genre === genre
      return matchesQ && matchesGenre
    })

    function handleGenreChange(newGenre) {
      // ⚠️ 기존 q 를 유지하기 위해 머지
      setSearchParams({ q, genre: newGenre })
    }

    return (
      <section>
        <h1>검색 결과</h1>
        <p>"{q}" — {filtered.length}편</p>

        <div>
          <button onClick={() => handleGenreChange('all')}>전체</button>
          <button onClick={() => handleGenreChange('drama')}>드라마</button>
          <button onClick={() => handleGenreChange('action')}>액션</button>
          <button onClick={() => handleGenreChange('romance')}>로맨스</button>
        </div>

        <div className={...}>
          {filtered.map((m) => <MovieCard key={m.id} movie={m} />)}
        </div>
      </section>
    )
  }
  export default Search
  ```
- [ ] `App.jsx`에 `<Route path="/search" element={<Search/>}/>` 추가

### Part B — Header 검색창

- [ ] `Header.jsx`에 `<input>` 추가, 엔터 시 `navigate(`/search?q=${value}`)`
  ```jsx
  import { useNavigate } from 'react-router-dom'
  const navigate = useNavigate()

  <input
    className={styles.searchInput}
    placeholder="영화 검색..."
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        navigate(`/search?q=${encodeURIComponent(e.target.value)}`)
      }
    }}
  />
  ```

### Part C — ProtectedRoute 개선 (`useLocation` 활용)

- [ ] 실습#7의 `ProtectedRoute`를 수정해, 비로그인 상태로 `/mypage` 접근 시 **원래 가려던 경로**를 `state`로 넘김
  ```jsx
  import { Navigate, useLocation } from 'react-router-dom'
  function ProtectedRoute({ children }) {
    const location = useLocation()
    if (!isLoggedIn()) {
      return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children
  }
  ```
- [ ] `Login.jsx`에서 로그인 성공 후 `location.state?.from?.pathname ?? '/'`로 이동

## 🔍 검증 방법

### 검색 기능

| 조작 | 기대 결과 |
|------|----------|
| Header 검색창에 "오펜" 입력 후 엔터 | `/search?q=오펜`으로 이동, 결과 표시 |
| `/search?q=라라&genre=romance` 직접 붙여넣기 | 같은 필터 결과 |
| 장르 버튼 클릭 | URL에 `&genre=...` 추가, `q`는 **유지** |
| 뒤로가기 | 이전 검색 상태 복원 |
| 검색 결과 URL을 새 탭에 붙여넣기 | 동일한 결과 |

### 로그인 → 원래 경로 복귀

| 조작 | 기대 결과 |
|------|----------|
| 로그아웃 상태로 `/mypage` 접근 | `/login`으로 이동 (state에 `/mypage` 저장됨) |
| Login 버튼 클릭 | `/mypage`로 자동 이동 |

## ⚠️ 흔한 실수

1. **`searchParams.q` (객체 접근)**
   ```jsx
   // ❌ searchParams 는 URLSearchParams 객체. 이렇게는 안 됨
   const q = searchParams.q

   // ✅
   const q = searchParams.get('q')
   ```

2. **`setSearchParams({ genre: 'drama' })` 만 호출 → 기존 `q`가 사라짐**
   - `setSearchParams`는 **덮어쓰기**입니다. 기존 값을 유지하려면 명시적으로 머지하세요.
   ```jsx
   setSearchParams({ q, genre: 'drama' })
   // 또는
   const next = new URLSearchParams(searchParams)
   next.set('genre', 'drama')
   setSearchParams(next)
   ```

3. **`location.state`를 영구 저장 데이터로 오해**
   - `state`는 history entry에 붙는 값입니다. **새로고침하면 사라집니다.**
   - 영구 저장이 필요하면 localStorage/쿠키/서버를 쓰세요.

## 🏆 도전 과제 (선택)

- 검색어 **디바운싱**: 입력할 때마다 URL이 바뀌면 뒤로가기가 타이핑 수만큼 쌓입니다. 300ms 디바운스 후 `navigate(..., { replace: true })`로 히스토리를 덮어쓰세요.
- **해시로 섹션 이동**: 상세 페이지에 "줄거리 / 스태프 / 리뷰" 섹션을 만들고, Header의 네비에 `to="/movies/1#reviews"` 같은 링크를 걸어 `useLocation().hash` 변경 시 `scrollIntoView()`로 이동하세요.

## 💬 Discussion Prompts

1. 검색 상태를 `useState`에 두는 것과 URL 쿼리에 두는 것의 장단점을 5가지씩 비교해 보세요. (공유 가능성, 새로고침, SEO, 브라우저 뒤로가기, 초기 진입 등)
2. `useLocation().state`는 새로고침 시 사라지는데, 왜 이렇게 설계됐을까요? (힌트: History API의 `pushState`는 state를 세션에 저장하지만 일관성과 보안을 위해 일시적으로 취급)

## 🆘 막혔을 때

```bash
git checkout solution-실습08 -- src/
```

---

**이전 단계 ←** [실습#7](./실습07-404-protected.md)

🎉 **축하합니다!** 8개 실습을 모두 완료하면 CineLog가 완성됩니다.
