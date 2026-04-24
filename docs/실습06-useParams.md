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

| URL | useParams 결과 |
|-----|---------------|
| `/movies/1`   | `{ movieId: "1" }` |
| `/movies/42`  | `{ movieId: "42" }` |
| `/movies/abc` | `{ movieId: "abc" }` |

## ✅ 할 일 — 3곳만 수정

### 1️⃣ `src/pages/MovieDetail.jsx` — useParams 호출

```jsx
import { useParams } from 'react-router-dom'       // ← 주석 해제

function MovieDetail() {
  const { movieId } = useParams()                  // ← 추가
  const movie = findMovieById(movieId)             // ← 기존 `null` 변수 제거
  // ...
}
```

### 2️⃣ `src/App.jsx` — 동적 라우트 등록

```jsx
import MovieDetail from './pages/MovieDetail'

<Routes>
  {/* 기존 라우트들 */}

  {/* 중첩 레이아웃 바깥에 등록 — 상세는 사이드바 없이 전체 화면 */}
  <Route path="/movies/:movieId" element={<MovieDetail />} />
</Routes>
```

> 💡 **왜 중첩 바깥?** 상세 페이지는 영화 한 편에 집중할 수 있게 사이드바를 빼는 편이 UX에 낫습니다. (안쪽에 두는 변형도 가능 — 도전 과제)

### 3️⃣ `src/pages/genres/Drama.jsx`, `Action.jsx`, `Romance.jsx` — 카드를 Link 로 감싸기

각 파일의 TODO 2 를 처리합니다. 3파일 **동일한 패턴**이므로 한 번 이해하면 나머지는 복붙입니다.

```jsx
import { Link } from 'react-router-dom'                 // ← 주석 해제

{items.map((movie) => (
  <Link key={movie.id} to={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
    <MovieCard movie={movie} />
  </Link>
))}
```

## 🔍 검증 방법

| 조작 | 기대 결과 |
|------|----------|
| `/movies/drama` 에서 아무 카드 클릭 | 해당 영화 상세 페이지로 이동 |
| 주소창에 `/movies/3` 직접 입력 | "기생충" 상세 표시 |
| `/movies/9999` | "영화를 찾을 수 없습니다" 메시지 |
| 브라우저 뒤로가기 | 직전 장르 페이지 복귀 |

## ⚠️ 흔한 실수

1. **`:movieId` 와 `movieid` 대소문자 불일치**
   ```jsx
   // 라우트: path="/movies/:movieId"
   const { movieid } = useParams()   // ❌ undefined
   const { movieId } = useParams()   // ✅
   ```
2. **문자열 ID 를 숫자와 `===` 비교**
   - `useParams()` 값은 항상 문자열. `Number(movieId)` 또는 `parseInt` 로 변환.
   - (이 실습에서는 `findMovieById` 가 내부에서 처리해 줍니다.)

## 🏆 도전 과제 (선택)

- `MovieDetail.jsx` 하단의 주석 처리된 "← 뒤로" 버튼 주석 해제 + `useNavigate` 로 연결.
- 상세 페이지에 **이전 / 다음 영화** 버튼 (`navigate(`/movies/${id+1}`)` 등).

## 💬 Discussion Prompts

1. `/movies/:movieId` 와 `/movies/drama` 가 동시에 있는 것이 어떻게 가능할까요? 매칭 우선순위는?
2. 만약 SEO 가 중요하다면 `/movies/:movieId/:slug` 처럼 제목도 URL 에 넣기도 합니다. 이때 slug 만 쓰고 id 없이 처리하려면 뭐가 필요할까요?

## 🆘 막혔을 때

```bash
git checkout solutions -- src/pages/MovieDetail.jsx src/pages/genres/ src/App.jsx
```

---

**이전 ←** [실습#5](./실습05-outlet-nested.md) | **다음 →** [실습#7: 404 + ProtectedRoute](./실습07-404-protected.md)
