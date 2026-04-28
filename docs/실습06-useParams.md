# 실습#6 — useParams 로 상세 페이지

> 관련 교안: **PART 4-3. useParams로 동적 라우팅**

## 🎯 학습 목표

URL 의 동적 세그먼트(`:movieId`)를 **하나의 Route 로** 처리해 리스트 → 상세 페이지 네비게이션을 완성합니다.

## 🗺️ 매핑 그림

```
Route 선언:
  <Route path="/movies/:movieId" element={<MovieDetail />} />
                  ↑
                  ":" = "여기는 변수"

브라우저 /movies/7 접속
        ▼
  useParams() === { movieId: "7" }   ← 문자열!
        ▼
  findMovieById("7") — 내부에서 Number 변환
```

| URL           | useParams 결과       |
| ------------- | -------------------- |
| `/movies/1`   | `{ movieId: "1" }`   |
| `/movies/42`  | `{ movieId: "42" }`  |
| `/movies/abc` | `{ movieId: "abc" }` |

## ✅ 할 일 — 3곳만 수정

### 1️⃣ `src/pages/MovieDetail.jsx` — useParams 호출

```jsx
import { useParams } from "react-router"; // ← 주석 해제

function MovieDetail() {
  const { movieId } = useParams(); // ← 추가
  const movie = findMovieById(movieId); // ← 기존 `null` 변수 제거
  // ...
}
```

### 2️⃣ `src/App.jsx` — 동적 라우트 등록

```jsx
import MovieDetail from "./pages/MovieDetail";

<Routes>
  {/* 기존 라우트들 */}

  {/* 중첩 레이아웃 바깥에 등록 — 상세는 사이드바 없이 전체 화면 */}
  <Route path="/movies/:movieId" element={<MovieDetail />} />
</Routes>;
```

> 💡 **왜 중첩 바깥?** 상세 페이지는 영화 한 편에 집중할 수 있게 사이드바를 빼는 편이 UX에 낫습니다.

### 3️⃣ `src/pages/genres/Drama.jsx`, `Action.jsx`, `Romance.jsx` — 카드를 Link 로 감싸기

각 파일의 TODO 2 를 처리합니다. 3파일 **동일한 패턴**이므로 한 번 이해하면 나머지는 복붙입니다.

```jsx
import { Link } from "react-router"; // ← 주석 해제

{
  items.map((movie) => (
    <Link
      key={movie.id}
      to={`/movies/${movie.id}`}
      style={{ textDecoration: "none" }}
    >
      <MovieCard movie={movie} />
    </Link>
  ));
}
```

## ⚠️ 흔한 실수

1. **`:movieId` 와 `movieid` 대소문자 불일치**
   ```jsx
   // 라우트: path="/movies/:movieId"
   const { movieid } = useParams(); // ❌ undefined
   const { movieId } = useParams(); // ✅
   ```
2. **문자열 ID 를 숫자와 `===` 비교**
   - `useParams()` 값은 항상 문자열. `Number(movieId)` 또는 `parseInt` 로 변환.
   - (이 실습에서는 `findMovieById` 가 내부에서 처리해 줍니다.)
