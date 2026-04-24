# 실습#1 — 최초의 라우트 3개 만들기

> 관련 교안: **PART 2. 기본 세팅**

## 🎯 학습 목표

**URL ↔ 컴포넌트 매핑**의 기본 구조를 만들어봅니다. 페이지 파일은 이미 전부 준비돼 있으니, 여러분은 `BrowserRouter`로 앱을 감싸고 **`<Routes>` + `<Route>`**를 작성해 연결만 하면 됩니다.

## 🗺️ 동작 흐름

```
사용자가 주소창에 /movies 입력
        │
        ▼
  BrowserRouter (main.jsx) → URL 감지
        ▼
  Routes (App.jsx) → path 와 일치하는 Route 찾기
        ▼
  Route path="/movies" element={<Movies/>} 매칭
        ▼
  <Movies /> 컴포넌트 렌더
```

## ✅ 할 일 (총 3개 파일만 건드립니다)

### 1️⃣ `src/main.jsx` — BrowserRouter 로 감싸기

- **TODO 1:** `react-router-dom`에서 `BrowserRouter` import
- **TODO 2:** `<App />`을 `<BrowserRouter>...</BrowserRouter>`로 감싸기

### 2️⃣ `src/App.jsx` — Routes 작성

파일 상단의 주석으로 표시된 import를 **필요한 만큼만 주석 해제**하고 Routes를 작성하세요.

```jsx
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import About from './pages/About'

function App() {
  return (
    <Routes>
      <Route path="/"       element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/about"  element={<About />} />
    </Routes>
  )
}
export default App
```

### 3️⃣ (페이지는 이미 준비돼 있습니다)

`src/pages/Home.jsx`, `Movies.jsx`, `About.jsx` — 이미 내용이 채워져 있습니다. **여러분이 만들 필요 없습니다.**

## 🔍 검증 방법

`npm run dev` 실행 후 주소창에 입력:

| 주소 | 기대 결과 |
|------|----------|
| `/`       | "CineLog에 오신 걸 환영합니다" + 카운트 버튼 + "영화 구경하러 가기" 버튼 |
| `/movies` | "영화 목록" 제목 |
| `/about`  | "CineLog 소개" 페이지 |
| `/xyz`    | 빈 화면 (정상 — 실습#7에서 404로 처리) |

> 💡 주소창의 주소만 바꿔도 페이지가 전환돼야 합니다. 이게 React Router의 가장 기본 기능입니다.

## ⚠️ 흔한 실수

1. **BrowserRouter를 App 내부에 둠** → main.jsx 에서 `<App />`을 감싸야 합니다.
2. **`element` 에 문자열 전달**
   ```jsx
   <Route path="/" element="Home" />   // ❌
   <Route path="/" element={<Home />} /> // ✅
   ```
3. **`<Routes>` 없이 `<Route>`만 사용** → 반드시 `<Routes>`로 감싸야 합니다.

## 🏆 도전 과제 (선택)

- `App.jsx` 에 `<Route path="/movies/top10" element={<h1>TOP 10</h1>} />` 같은 인라인 element 도 가능합니다. 넣어보고 동작 확인.

## 💬 Discussion Prompts

1. `BrowserRouter`는 화면에 아무것도 그리지 않는데 왜 반드시 필요할까요?
2. `Route` 순서가 중요한 경우가 있을까요? (답: 실습#7 `path="*"` 에서 체감)

## 🆘 막혔을 때

```bash
git checkout solutions -- src/main.jsx src/App.jsx
```

---

**다음 →** [실습#2: Link로 전환하기](./실습02-link.md)
