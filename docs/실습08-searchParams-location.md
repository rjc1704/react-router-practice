# 실습#8 — useSearchParams + useLocation

> 관련 교안: **PART 5-3, 5-4. useSearchParams, useLocation**

## 🎯 학습 목표

**URL 을 앱 상태의 source of truth 로** — 검색어/필터를 `useState` 가 아닌 URL 쿼리스트링에 두면 새로고침·뒤로가기·링크 공유가 자연스럽게 동작합니다. 이 감각을 체득합니다.

## 🗺️ URL 해부

```
  https://cinelog.com/search?q=오펜하이머&genre=drama#section1
  └─────┬──────┘└───┬──┘└────────────┬────────────┘└──┬───┘
      host      pathname          search              hash

  useLocation() = { pathname, search, hash, state, key }
```

## ✅ 할 일

### 1️⃣ `src/pages/Search.jsx` — 핵심 훅 호출

이미 UI, 필터 로직, 장르 버튼은 모두 완성돼 있습니다. 여러분은 **useSearchParams 호출**과 **setSearchParams 사용** 부분만 채우면 됩니다.

```jsx
import { useSearchParams } from 'react-router-dom'   // ← 주석 해제

function Search() {
  const [searchParams, setSearchParams] = useSearchParams()   // ← 이 한 줄로 교체

  // (이 아래 q, genre 는 이미 .get 으로 읽도록 돼 있음 — 수정 불필요)
  const q = searchParams.get('q') ?? ''
  const genre = searchParams.get('genre') ?? 'all'

  function handleGenreChange(newGenre) {
    setSearchParams({ q, genre: newGenre })          // ← alert 대신 이걸로
  }
}
```

### 2️⃣ `src/components/Header.jsx` — 검색창 활성화

Header.jsx 에 주석 처리된 `<input type="search" ...>` 를 **해제**합니다. `handleSearch` 함수의 `alert` 줄을 `navigate` 로 바꿉니다.

```jsx
// import 이미 실습#7 에서 열었다면 재사용
import { useNavigate } from 'react-router-dom'

function handleSearch(e) {
  if (e.key !== 'Enter') return
  const q = e.target.value.trim()
  if (!q) return
  navigate(`/search?q=${encodeURIComponent(q)}`)     // ← alert 대신 이걸로
}
```

### 3️⃣ `src/App.jsx` — /search 라우트 추가

```jsx
import Search from './pages/Search'

<Route path="/search" element={<Search />} />
```

### 4️⃣ (도전 과제) `ProtectedRoute` + `Login` 에 useLocation 연결

실습#7 도전과제를 아직 안 했다면 지금 해보세요. `ProtectedRoute` 에서 `location` 을 `state` 에 담고, `Login` 에서 `location.state.from.pathname` 으로 복귀.

## 🔍 검증 방법

### 검색

| 조작 | 기대 결과 |
|------|----------|
| Header 검색창에 "오펜" 입력 + 엔터 | `/search?q=오펜` 으로 이동, 결과 표시 |
| 주소창에 `/search?q=라라&genre=romance` 붙여넣기 | 같은 결과 (URL = 공유 가능한 상태!) |
| 장르 버튼 클릭 | URL 에 `genre` 추가, `q` **유지됨** |
| 뒤로가기 | 이전 필터 상태 복원 |
| 검색 URL 을 새 탭/시크릿 창에 붙여넣기 | 동일한 결과 |

### 도전 과제: 로그인 후 원래 경로 복귀

| 조작 | 기대 결과 |
|------|----------|
| 로그아웃 상태로 `/mypage` 접근 | `/login` 으로 이동 (state 에 `/mypage` 담김) |
| Login 버튼 클릭 | 자동으로 `/mypage` 로 이동 |

## ⚠️ 흔한 실수

1. **`searchParams.q` 로 접근 (객체처럼)**
   ```jsx
   searchParams.q           // ❌ undefined. 이건 URLSearchParams 객체
   searchParams.get('q')    // ✅
   ```
2. **`setSearchParams({ genre })` 만 호출 → 기존 q 가 사라짐**
   - `setSearchParams` 는 **덮어쓰기**입니다. 기존 값 유지하려면 명시적으로 머지.
   ```jsx
   setSearchParams({ q, genre: 'drama' })
   ```
3. **`location.state` 를 영구 저장처럼 씀**
   - 새로고침 시 **사라집니다**. 영구 저장은 localStorage / 쿠키 / 서버.

## 🏆 도전 과제 (선택)

- **디바운싱**: 매 키입력마다 URL 이 바뀌면 뒤로가기 스택이 지저분해짐. 300ms 디바운스 + `navigate(..., { replace: true })`.
- **해시로 섹션 이동**: 상세 페이지에 "줄거리 / 스태프 / 리뷰" 섹션 만들고 `#reviews` 같은 해시로 스크롤.

## 💬 Discussion Prompts

1. "검색어를 URL 에 두는 것" vs "useState 에 두는 것" — 각각의 장단점을 5가지씩 적어보세요.
2. `useLocation().state` 가 새로고침 시 사라지도록 설계된 이유는? (힌트: 세션 안전성, URL-first 철학)

## 🆘 막혔을 때

```bash
git checkout solutions -- src/pages/Search.jsx src/components/Header.jsx src/App.jsx
```

---

**이전 ←** [실습#7](./실습07-404-protected.md)

🎉 **축하합니다!** 8개 실습을 모두 완료하면 CineLog 가 완성됩니다.
