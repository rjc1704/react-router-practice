# 🔍 중간점검 자가 퀴즈 (실습#1 ~ #4)

실습#5 중첩 라우팅은 지금까지 배운 개념이 **전부 맞물려야** 따라올 수 있습니다. 아래 5문항을 **코드 한 줄도 보지 않고** 답해 보세요.

각 문항의 정답은 페이지 하단에 있습니다.

---

## Q1. 다음 코드는 무엇이 잘못됐을까요?

```jsx
// main.jsx
createRoot(...).render(
  <StrictMode>
    <App />
  </StrictMode>
)

// App.jsx
import { Routes, Route, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <BrowserRouter>
        <Route path="/" element={<Home/>} />
      </BrowserRouter>
    </Routes>
  )
}
```

---

## Q2. 다음 중 "페이지 전체가 서버에서 새로 로딩"되는 것을 **모두** 고르세요.

- (A) `<a href="/movies">영화</a>` 클릭
- (B) `<Link to="/movies">영화</Link>` 클릭
- (C) 브라우저 새로고침(F5)
- (D) 주소창에 `/movies` 직접 입력 후 엔터
- (E) `navigate('/movies')` 호출

---

## Q3. `<NavLink to="/" >홈</NavLink>` 에서 `end` prop을 쓰지 않으면 어떤 일이 생기나요?

---

## Q4. 다음 코드는 어떻게 동작하나요? (실행 결과 예상)

```jsx
function Home() {
  const navigate = useNavigate()
  navigate('/movies')
  return <h1>홈</h1>
}
```

---

## Q5. 아래 상황에서 Link와 useNavigate 중 뭘 써야 할까요?

1. 로그인 버튼 클릭 → API 호출 → 성공하면 홈으로 이동
2. 네비게이션 바의 "영화" 메뉴
3. 폼 제출 완료 후 "감사합니다" 페이지로 이동
4. 배너 광고 클릭 → 상품 페이지로 이동

---

---

## 📝 정답

**Q1:** `BrowserRouter`는 `<App/>`을 감싸는 **가장 바깥**이어야 합니다. main.jsx에서 `<BrowserRouter><App/></BrowserRouter>`로 감싸고, App.jsx 안의 `<BrowserRouter>`는 제거해야 합니다. `<Routes>`는 `<BrowserRouter>` 안에 있어야 합니다.

**Q2:** **(A), (C), (D)**
- (A) 일반 `<a>`는 서버 요청을 보냅니다.
- (B) Link는 클라이언트 라우팅이라 서버 요청 없음.
- (C) 새로고침은 HTML부터 다시 받습니다.
- (D) 주소창 입력 + 엔터는 서버에 해당 경로로 요청합니다. (SPA 개발 서버는 이걸 받아 index.html을 돌려주지만, 브라우저 관점에서는 풀 로딩입니다.)
- (E) `navigate()`는 history API 조작이라 서버 요청 없음.

**Q3:** "홈" 링크가 `/movies`, `/about` 등 **모든 페이지에서 항상 활성화**됩니다. `path="/"`가 모든 경로의 접두사라서 접두사 매칭에 걸리기 때문입니다. `end`를 붙여 **정확히 일치할 때만** 활성화되도록 해야 합니다.

**Q4:** **무한 루프로 브라우저가 멈춥니다.** 렌더 중 `navigate()`가 실행되면 → URL 변경 → 리렌더 → 또 `navigate()` → 무한 반복. 렌더 시점 리다이렉트가 필요하다면 `<Navigate to="/movies"/>`(실습#7)를 쓰거나 `useEffect`로 감싸야 합니다.

**Q5:**
1. **useNavigate** — API 응답 콜백 안에서 이동해야 함
2. **Link (또는 NavLink)** — 사용자가 직접 클릭, 현재 페이지 강조도 필요하므로 NavLink가 더 적합
3. **useNavigate** — 폼 제출 핸들러 안에서 이동
4. **Link** — 사용자가 직접 클릭하는 UI

---

## ✅ 4/5 이상 맞췄다면 → 실습#5로

아직 자신 없다면 해당 실습 문서로 돌아가 흔한 실수 섹션을 한 번 더 읽고 오세요.

**다음 →** [실습#5: Outlet과 중첩 라우팅](./실습05-outlet-nested.md)
