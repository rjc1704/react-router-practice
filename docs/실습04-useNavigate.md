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
import { useNavigate } from 'react-router-dom'   // ← 주석 해제

function Home() {
  // ...
  const navigate = useNavigate()                 // ← 추가

  function handleGoMovies() {
    navigate('/movies')                          // ← alert(...) 대신 이걸로 교체
  }
  // ...
}
```

### 2️⃣ `src/pages/ErrorDemo.jsx` — 홈으로 가기 버튼

```jsx
import { useNavigate } from 'react-router-dom'

function ErrorDemo() {
  const navigate = useNavigate()

  function handleGoHome() {
    navigate('/')
  }
  // ...
}
```

### 3️⃣ `src/App.jsx` — `/error` 라우트 등록

```jsx
import ErrorDemo from './pages/ErrorDemo'

<Routes>
  {/* 기존 라우트들 */}
  <Route path="/error" element={<ErrorDemo />} />
</Routes>
```

### 4️⃣ (선택) `src/pages/MovieDetail.jsx` 도전 과제 — `navigate(-1)` 뒤로가기

상세 페이지 하단의 주석 처리된 "뒤로" 버튼을 주석 해제하고 `useNavigate` 를 연결하세요.

## 🔍 검증 방법

| 조작 | 기대 결과 |
|------|----------|
| 홈의 "영화 구경하러 가기" 클릭 | URL 이 `/movies` 로 바뀜 |
| 주소창에 `/error` 직접 입력 | 에러 데모 페이지 표시 |
| 에러 페이지의 "홈으로 가기" 클릭 | `/` 로 이동 |
| 뒤로가기(브라우저) | 정상적으로 직전 페이지 복귀 |

## ⚠️ 흔한 실수

1. **컴포넌트 바깥에서 훅 호출** — `useNavigate()` 는 컴포넌트 함수 안에서만 호출합니다.
2. **렌더 중 `navigate()` 호출** → 무한 루프
   ```jsx
   function Home() {
     const navigate = useNavigate()
     navigate('/movies')                 // ❌ 렌더마다 실행 → 무한 루프
     return <h1>홈</h1>
   }
   ```
   → 렌더 시점 리다이렉트가 필요하면 **`<Navigate/>` 컴포넌트**(실습#7) 또는 `useEffect` 를 씁니다.

## 🏆 도전 과제 (선택)

- `navigate('/movies', { replace: true })` 와 일반 `navigate('/movies')` 의 차이를 **브라우저 뒤로가기**로 체감해 보세요.
- `MovieDetail.jsx` 하단의 "뒤로 가기" 버튼 주석 해제 후 `navigate(-1)` 로 연결.

## 💬 Discussion Prompts

1. `window.location.href = '/movies'` 와 `navigate('/movies')` 의 차이는?
2. `navigate(-1)` 은 `history.back()` 과 완전히 같을까요?

## 🆘 막혔을 때

```bash
git checkout solutions -- src/pages/Home.jsx src/pages/ErrorDemo.jsx src/App.jsx
```

---

**이전 ←** [실습#3](./실습03-navlink.md) | **다음 →** [🔍 중간점검 퀴즈](./중간점검-quiz.md) → [실습#5](./실습05-outlet-nested.md)
