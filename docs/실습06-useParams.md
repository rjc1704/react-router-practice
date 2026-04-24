# 실습#6 — useParams로 상세 페이지 만들기

> 관련 교안: **PART 4-3. useParams로 동적 라우팅 — 상품 상세페이지 만들기**

## 🎯 학습 목표

URL 세그먼트를 **동적 파라미터**로 받아 상세 페이지를 1개의 Route로 처리하는 법을 익힙니다. 리스트 → 상세 네비게이션의 표준 패턴을 구현합니다.

## 🗺️ 매핑 그림

```
Route 선언:
  <Route path="/movies/:movieId" element={<MovieDetail />} />
                  ↑
                  ":" 는 "여기는 변한다"는 뜻

브라우저에서 /movies/7 접속
        │
        ▼
  React Router 가 ":movieId" 자리에 "7" 이 온 것을 매칭
        │
        ▼
  <MovieDetail /> 렌더
        │
        ▼
  MovieDetail 안에서:
     const { movieId } = useParams()
     // movieId === "7" (문자열!)
```

| URL 패턴 | useParams 결과 |
|---------|---------------|
| `/movies/1`   | `{ movieId: "1" }` |
| `/movies/42`  | `{ movieId: "42" }` |
| `/movies/abc` | `{ movieId: "abc" }` (문자열 그대로) |

## ✅ 구현 요구사항

- [ ] **TODO 1:** `src/pages/MovieDetail.jsx` 생성
  ```jsx
  import { useParams } from 'react-router-dom'
  import { findMovieById } from '../data/movies'
  import styles from '../styles/layout.module.css'

  function MovieDetail() {
    const { movieId } = useParams()
    const movie = findMovieById(movieId)   // 내부에서 Number() 변환됨

    if (!movie) {
      return <p>영화를 찾을 수 없습니다.</p>
    }

    return (
      <section className={styles.detail}>
        <div className={styles.detailPoster}>{movie.poster}</div>
        <div>
          <h1 className={styles.detailTitle}>{movie.title}</h1>
          <p className={styles.detailMeta}>{movie.year} · ⭐ {movie.rating}</p>
          <p className={styles.detailSummary}>{movie.summary}</p>
        </div>
      </section>
    )
  }
  export default MovieDetail
  ```
- [ ] **TODO 2:** `App.jsx`에 라우트 등록
  ```jsx
  <Route path="/movies/:movieId" element={<MovieDetail />} />
  ```
  > 💡 **중요:** 이 라우트는 실습#5의 중첩 레이아웃 **바깥**에 두세요. 그러면 상세 페이지는 사이드바 없이 전체 화면을 쓸 수 있습니다. (도전 과제에서 안쪽에 두는 변형도 가능합니다.)
- [ ] **TODO 3:** 장르 페이지의 `<MovieCard>`를 `<Link>`로 감싸기
  ```jsx
  <Link to={`/movies/${movie.id}`} key={movie.id}>
    <MovieCard movie={movie} />
  </Link>
  ```

## 🔍 검증 방법

| 조작 | 기대 결과 |
|------|----------|
| `/movies/drama`에서 카드 클릭 | 해당 영화의 상세 페이지로 이동 |
| 주소창에 `/movies/3` 직접 입력 | "기생충" 상세 표시 |
| `/movies/9999` 접속 | "영화를 찾을 수 없습니다" 메시지 |
| 상세 페이지에서 뒤로가기 | 직전 장르 페이지로 복귀 |

## ⚠️ 흔한 실수

1. **`:movieId`와 `params.movieid` 대소문자 불일치**
   ```jsx
   // 라우트: path="/movies/:movieId"
   const { movieid } = useParams()  // ❌ undefined
   const { movieId } = useParams()  // ✅
   ```

2. **문자열 ID를 숫자와 `===` 비교**
   ```jsx
   const { movieId } = useParams()   // "7" (문자열)
   movies.find(m => m.id === movieId)  // ❌ 1 === "1" 은 false
   movies.find(m => m.id === Number(movieId))  // ✅
   ```
   > `data/movies.js`의 `findMovieById`는 내부에서 `Number()`를 처리합니다.

## 🏆 도전 과제 (선택)

- 상세 페이지에 **"← 이전 영화"** / **"다음 영화 →"** 버튼을 추가해 `useNavigate`로 id를 증감하며 이동하세요. (범위 밖은 disabled)
- 상세 페이지에 "← 목록으로" 버튼 → `navigate(-1)` 로 구현

## 💬 Discussion Prompts

1. `/movies/:movieId`와 `/movies/drama`가 동시에 있다면 React Router는 어떻게 구분할까요? (힌트: 정적 세그먼트가 동적 세그먼트보다 우선)
2. 만약 SEO가 중요한 서비스라면 `/movies/:movieId`에 `movie.title`을 slug로 함께 담는 `/movies/:movieId/:slug`도 유용합니다. 이때 slug만 쓰고 id를 안 쓸 수 있을까요?

## 🆘 막혔을 때

```bash
git checkout solution-실습06 -- src/
```

---

**이전 단계 ←** [실습#5](./실습05-outlet-nested.md) | **다음 단계 →** [실습#7: 404 + 보호 라우트](./실습07-404-protected.md)
