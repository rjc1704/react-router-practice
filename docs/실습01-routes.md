# 실습#1 — 최초의 라우트 3개 만들기

> 관련 교안: **PART 2. 기본 세팅**

## 🎯 학습 목표

BrowserRouter / Routes / Route의 관계를 이해하고, **URL 3개에 서로 다른 컴포넌트를 매핑**해 봅니다.

## 🗺️ 동작 흐름 그림

```
사용자가 주소창에 /movies 입력
        │
        ▼
┌─────────────────┐
│  BrowserRouter  │ ← URL을 감시 (main.jsx)
└────────┬────────┘
         ▼
┌─────────────────┐
│     Routes      │ ← 여러 Route 중 일치하는 걸 고름 (App.jsx)
└────────┬────────┘
         ▼
┌─────────────────────────────────────┐
│  Route path="/"       → <Home/>     │
│  Route path="/movies" → <Movies/> ✅ 매칭!
│  Route path="/about"  → <About/>    │
└─────────────────────────────────────┘
         ▼
    화면에 <Movies/> 렌더링
```

## ✅ 구현 요구사항

- [ ] **TODO 1:** `src/main.jsx` 에서 `<App />`을 `<BrowserRouter>`로 감싸기
- [ ] **TODO 2:** `src/pages/Home.jsx`, `Movies.jsx`, `About.jsx` 3개 파일 생성
  - 각 파일은 `<h1>홈</h1>` 같은 아주 단순한 컴포넌트만 `export default`
- [ ] **TODO 3:** `src/App.jsx`에서 `Routes`와 `Route`를 import하고 아래 매핑 작성
  - `/` → `<Home />`
  - `/movies` → `<Movies />`
  - `/about` → `<About />`

### 힌트 — `App.jsx` 최종 형태

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

## 🔍 검증 방법

`npm run dev` 로 개발 서버를 실행하고, 브라우저 주소창에 아래를 입력해 보세요.

| 주소            | 기대 결과                       |
|-----------------|--------------------------------|
| http://localhost:5173/         | "홈" 제목이 뜬다                |
| http://localhost:5173/movies   | "영화 목록" 제목이 뜬다         |
| http://localhost:5173/about    | "소개" 제목이 뜬다              |
| http://localhost:5173/xyz      | 빈 화면 (의도된 상태. 실습#7에서 404로 해결) |

## ⚠️ 흔한 실수

1. **BrowserRouter를 `<Routes>` 안에 넣는다**
   ```jsx
   // ❌
   <Routes>
     <BrowserRouter> ... </BrowserRouter>
   </Routes>
   ```
   → BrowserRouter는 **앱 전체를 감싸는** 가장 바깥 컨테이너입니다. `main.jsx`에서 한 번만 감싸세요.

2. **`element`에 컴포넌트를 문자열로 쓴다**
   ```jsx
   // ❌
   <Route path="/" element="Home" />

   // ✅
   <Route path="/" element={<Home />} />
   ```
   → JSX로 넘겨야 합니다. 단순 문자열이 아니라 "컴포넌트 인스턴스"를 넘긴다고 기억하세요.

## 🏆 도전 과제 (선택)

- `/movies/top10` 경로를 하나 더 하드코딩해 `<h1>TOP 10 영화</h1>`을 보여주세요.
  - 지금은 `Route`를 한 줄 더 추가하는 식으로 해결해도 됩니다. **다음 실습에서 이게 왜 비효율적인지** 이야기해봅시다.

## 💬 Discussion Prompts

1. `BrowserRouter`는 "앱 화면에 아무것도 그리지 않지만 반드시 필요한" 컴포넌트입니다. 왜 그럴까요?
2. `Route`가 100개라면? React Router가 100개를 매번 순회할까요? (답은 Routes의 내부 매칭 알고리즘에 있습니다. 찾아보세요.)

## 🆘 막혔을 때

```bash
# 실습#1 완료 상태를 src/ 에 그대로 복원
git fetch --tags origin
git checkout solution-실습01 -- src/
```

---

**다음 단계 →** [실습#2: Link로 전환하기](./실습02-link.md)
