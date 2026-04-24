# 실습#7 — 404 페이지 + ProtectedRoute

> 관련 교안: **PART 5-1, 5-2. 404 페이지, Navigate 리다이렉트**

## 🎯 학습 목표

1. **404 페이지** 연결 (`path="*"`)
2. **`<Navigate/>` 컴포넌트** 로 조건부 리다이렉트
3. **재사용 가능한 ProtectedRoute** 패턴

> ⚠️ 이 실습의 "로그인"은 `localStorage` 불린 한 개로 동작하는 **실습용 더미**입니다. 실제 서비스는 서버 검증/토큰이 필요합니다. 이 실습은 **라우팅 제어**만 학습하기 위한 단순화입니다.

## 🗺️ ProtectedRoute 동작 흐름

```
사용자가 /mypage 접근
        ▼
  <ProtectedRoute> 렌더
        ▼
   isLoggedIn() ?
   ┌───┴───┐
   YES     NO
    │       │
    ▼       ▼
 children   <Navigate to="/login" replace />
            └→ 즉시 /login 으로 이동
```

## ✅ 할 일

이 실습은 **3개 파일의 TODO 를 채우고 + App.jsx 에 라우트 3개를 추가**하는 것이 전부입니다. 페이지들은 이미 준비돼 있습니다.

### 1️⃣ `src/components/ProtectedRoute.jsx` — 핵심 패턴

이 파일이 실습#7의 하이라이트입니다. 단 3줄만 풀리면 됩니다.

```jsx
import { Navigate } from 'react-router-dom'           // ← 주석 해제
import { isLoggedIn } from '../lib/auth'

function ProtectedRoute({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />           // ← 주석 해제 + return 필수
  }
  return children
}
```

### 2️⃣ `src/pages/Login.jsx` — 로그인 후 이동

```jsx
import { useNavigate } from 'react-router-dom'        // ← 주석 해제

function Login() {
  const navigate = useNavigate()                      // ← 추가

  function handleLogin() {
    auth.login()
    navigate('/mypage', { replace: true })            // ← alert 제거하고 이걸로 교체
  }
  // ...
}
```

### 3️⃣ `src/components/Header.jsx` — 로그인/로그아웃 버튼 활성화

Header.jsx 하단의 주석 처리된 "로그인/로그아웃 토글" JSX 를 주석 해제하고, 관련 import 도 해제하세요.

```jsx
import { useNavigate } from 'react-router-dom'
import { isLoggedIn, logout } from '../lib/auth'
// ...
const navigate = useNavigate()
const loggedIn = isLoggedIn()
```

### 4️⃣ `src/App.jsx` — 라우트 3개 추가

```jsx
import Login from './pages/Login'
import MyPage from './pages/MyPage'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

<Routes>
  {/* 기존 라우트들 */}

  <Route path="/login" element={<Login />} />

  {/* 보호된 라우트 */}
  <Route
    path="/mypage"
    element={
      <ProtectedRoute>
        <MyPage />
      </ProtectedRoute>
    }
  />

  {/* 반드시 맨 마지막! */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

## 🔍 검증 방법

| 상태 | 조작 | 기대 결과 |
|------|------|----------|
| 로그아웃 | `/mypage` 접근 | `/login` 으로 자동 리다이렉트 |
| (Login 버튼 클릭) | | `/mypage` 로 이동 + 뒤로가기 해도 `/login` 으로 안 돌아감 (replace) |
| 로그인 | `/mypage` 접근 | 정상 렌더 |
| 로그인 상태 | Header "로그아웃" 클릭 | 홈으로 이동 + Header 가 "로그인" 버튼으로 바뀜 |
| 아무 상태 | `/asdf` 접근 | 404 페이지 |

## ⚠️ 흔한 실수

1. **`<Navigate>` 에 `replace` 누락 → 뒤로가기 무한 루프**
   ```
   /mypage → /login 이동 (히스토리에 /mypage 쌓임)
   /login 에서 뒤로가기 → /mypage → 또 /login → ...
   ```
2. **`path="*"` 를 Routes 최상단에 둠 → 모든 경로가 404**
   - Routes 는 위에서부터 매칭. `*` 는 반드시 마지막.
3. **`return` 없이 `<Navigate/>`**
   ```jsx
   if (!isLoggedIn()) {
     <Navigate to="/login" />     // ❌ JSX 이지만 반환 안 함 → 아무 일 안 일어남
   }
   return children

   // ✅
   if (!isLoggedIn()) return <Navigate to="/login" replace />
   ```

## 🏆 도전 과제 (선택)

**로그인 후 원래 가려던 페이지로 돌아오기** — 실습#8 의 `useLocation` 을 활용합니다.

```jsx
// ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom'
function ProtectedRoute({ children }) {
  const location = useLocation()
  if (!isLoggedIn()) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}

// Login.jsx
const location = useLocation()
const from = location.state?.from?.pathname ?? '/mypage'
// ... navigate(from, { replace: true })
```

Login.jsx 의 TODO 주석에 이 부분 힌트가 이미 있습니다.

## 💬 Discussion Prompts

1. "서버에서 /mypage 를 막으면 되는데 왜 클라이언트에서도 막나요?"
   → 보안이 아니라 **UX** 를 위해. 진짜 권한 검사는 반드시 서버에서.
2. `isLoggedIn()` 이 상태가 아닌 함수라서 로그인/로그아웃 후 자동 리렌더되지 않습니다. 어떻게 해결할까요? (힌트: Context / 전역 상태)

## 🆘 막혔을 때

```bash
git checkout solutions -- src/components/ProtectedRoute.jsx src/pages/Login.jsx src/components/Header.jsx src/App.jsx
```

---

**이전 ←** [실습#6](./실습06-useParams.md) | **다음 →** [실습#8: useSearchParams + useLocation](./실습08-searchParams-location.md)
