# 실습#4 — useNavigate 로 버튼 클릭 이동

> 관련 교안: **PART 3-3. useNavigate로 버튼 클릭 시 페이지 이동하기**

## 🎯 학습 목표

사용자의 직접 클릭이 아닌 **이벤트 핸들러 / 비동기 콜백**에서 코드로 페이지를 이동해야 하는 상황을 다룹니다.

## 🗺️ 언제 Link 대신 useNavigate 를 쓰나?

```
        ┌─────────────────────────────────────┐
        │ 누가 페이지 이동을 트리거하는가?      │
        └───────────────┬─────────────────────┘
                        │
     ┌──────────────────┼──────────────────┐
     ▼                  ▼                  ▼
 사용자가 직접     로그인 성공 후      에러 시
 링크 클릭         API 응답 후         자동으로
     │                  │                  │
     ▼                  ▼                  ▼
  <Link>          useNavigate()      useNavigate()
  <NavLink>
```

## ✅ 할 일 (파일 2개의 TODO 채우기)

이 실습에서 쓸 페이지들은 **이미 전부 만들어져 있습니다**. 각 파일의 TODO 주석을 따라 훅을 호출하는 1~2줄만 채우면 됩니다.

### 1️⃣ `src/pages/Home.jsx` — "영화 구경하기" 버튼 활성화

```jsx
import { useNavigate } from "react-router-dom"; // ← 주석 해제

function Home() {
  // ...
  const navigate = useNavigate(); // ← 추가

  function handleGoMovies() {
    navigate("/movies"); // ← alert(...) 대신 이걸로 교체
  }
  // ...
}
```

### 2️⃣ `src/pages/ErrorDemo.jsx` — 홈으로 가기 버튼

```jsx
import { useNavigate } from "react-router-dom";

function ErrorDemo() {
  const navigate = useNavigate();

  function handleGoHome() {
    navigate("/");
  }
  // ...
}
```

### 3️⃣ `src/App.jsx` — `/error` 라우트 등록

```jsx
import ErrorDemo from "./pages/ErrorDemo";

<Routes>
  {/* 기존 라우트들 */}
  <Route path="/error" element={<ErrorDemo />} />
</Routes>;
```
