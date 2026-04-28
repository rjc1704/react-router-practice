# 실습#2 — Link로 전환하기

> 관련 교안: **PART 3-1. Link로 이동하기**

## 🎯 학습 목표

`<a href>` 와 `<Link to>` 의 차이를 **DevTools Network 탭**으로 직접 확인하고, SPA 특유의 "새로고침 없는 전환"을 체감합니다.

## 🗺️ 비교 그림

```
<a href="/movies">              <Link to="/movies">
       │                                │
   클릭 ▼                            클릭 ▼
 서버에 /movies 요청 📡          URL만 바꿈 (서버 요청 없음)
       ▼                                ▼
 HTML 전체 새로 받음              JS가 화면만 교체
       ▼                                ▼
 ❌ 전체 새로고침 / 상태 초기화   ✅ 부드러운 전환 / 상태 유지
```

## ✅ 할 일 (2개 파일만 건드립니다)

### 1️⃣ `src/App.jsx` — Header 배치

```jsx
import { Routes, Route } from "react-router";
import Header from "./components/Header"; // ← 추가
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import About from "./pages/About";

function App() {
  return (
    <>
      {/* 헤더 위치 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}
```

> 💡 **왜 `<Routes>` 바깥?** 안쪽에 두면 페이지가 바뀔 때마다 Header 가 **재마운트**되어 내부 state(로그인 상태 등)가 날아갑니다.

### 2️⃣ `src/components/Header.jsx` — `<a>` → `<Link>` 교체

파일을 열면 현재 `<a href="...">` 버전으로 작성돼 있습니다. 여러분이 할 일:

- **TODO 1:** `react-router`에서 `Link` import
- **TODO 2:** 3개의 `<a>`를 모두 `<Link>`로 교체 (`href` → `to`)
- 로고 `<a href="/">🎬 CineLog</a>` 도 `<Link to="/">` 로 바꿔도 좋습니다.

```jsx
// Before
<a href="/"       className={styles.navLink}>홈</a>

// After
<Link to="/"       className={styles.navLink}>홈</Link>
```

## ⚠️ 흔한 실수

1. **`to=` 대신 `href=`**
   ```jsx
   <Link href="/movies">영화</Link>   // ❌ 그냥 <a> 로 동작
   <Link to="/movies">영화</Link>     // ✅
   ```
2. **`<Header />`를 `<Routes>` 안쪽에 배치** → 재마운트되어 상태 유실
