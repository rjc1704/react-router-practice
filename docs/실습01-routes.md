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

- **TODO 1:** `react-router`에서 `BrowserRouter` import
- **TODO 2:** `<App />`을 `<BrowserRouter>...</BrowserRouter>`로 감싸기

### 2️⃣ `src/App.jsx` — Routes 작성

파일 상단의 주석으로 표시된 import를 **필요한 만큼만 주석 해제**하고 Routes를 작성하세요.
사용자가 url path 를
"/"로 접근 시 Home 컴포넌트
"/movies"로 접근 시 Movies 컴포넌트
"/about"으로 접근 시 About 컴포넌트가 렌더링 되어야합니다.

### 3️⃣ (페이지는 이미 준비돼 있습니다)

`src/pages/Home.jsx`, `Movies.jsx`, `About.jsx` — 이미 내용이 채워져 있습니다. **여러분이 만들 필요 없습니다.**
