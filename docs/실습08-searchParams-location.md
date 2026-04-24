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
import { useSearchParams } from "react-router-dom"; // ← 주석 해제

function Search() {
  const [searchParams, setSearchParams] = useSearchParams(); // ← 이 한 줄로 교체

  // (이 아래 q, genre 는 이미 .get 으로 읽도록 돼 있음 — 수정 불필요)
  const q = searchParams.get("q") ?? "";
  const genre = searchParams.get("genre") ?? "all";

  function handleGenreChange(newGenre) {
    setSearchParams({ q, genre: newGenre }); // ← alert 대신 이걸로
  }
}
```

### 2️⃣ `src/components/Header.jsx` — 검색창 활성화

Header.jsx 에 주석 처리된 `<input type="search" ...>` 를 **해제**합니다. `handleSearch` 함수의 `alert` 줄을 `navigate` 로 바꿉니다.

```jsx
// import 이미 실습#7 에서 열었다면 재사용
import { useNavigate } from "react-router-dom";

function handleSearch(e) {
  if (e.key !== "Enter") return;
  const q = e.target.value.trim();
  if (!q) return;
  navigate(`/search?q=${encodeURIComponent(q)}`); // ← alert 대신 이걸로
}
```

### 3️⃣ `src/App.jsx` — /search 라우트 추가

```jsx
import Search from "./pages/Search";

<Route path="/search" element={<Search />} />;
```

## ⚠️ 흔한 실수

1. **`searchParams.q` 로 접근 (객체처럼)**
   ```jsx
   searchParams.q; // ❌ undefined. 이건 URLSearchParams 객체
   searchParams.get("q"); // ✅
   ```
2. **`setSearchParams({ genre })` 만 호출 → 기존 q 가 사라짐**
   - `setSearchParams` 는 **덮어쓰기**입니다. 기존 값 유지하려면 명시적으로 머지.
   ```jsx
   setSearchParams({ q, genre: "drama" });
   ```
