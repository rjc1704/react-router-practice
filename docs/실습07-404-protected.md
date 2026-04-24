# 실습#7 — 404 페이지 + ProtectedRoute

> 관련 교안: **PART 5-1, 5-2. 404 페이지 처리, Navigate로 자동 리다이렉트**

## 🎯 학습 목표

1. 존재하지 않는 경로에 대한 **404 페이지**를 준비합니다.
2. 로그인이 필요한 페이지에 **조건부 리다이렉트**를 구현합니다 (`<Navigate/>`).
3. 여러 페이지를 한 번에 보호하는 **ProtectedRoute** 재사용 패턴을 만듭니다.

> ⚠️ **경고:** 이 실습에서 만드는 "로그인"은 `localStorage` 불린 하나로 동작하는 **순수 실습용 더미**입니다. 실제 서비스는 서버 검증/토큰이 필요합니다. 이 실습은 **라우팅 제어**만 학습하기 위한 단순화입니다.

## 🗺️ 동작 흐름

```
사용자가 /mypage 접근
        │
        ▼
┌────────────────────┐
│ <ProtectedRoute>   │ ← 우리가 만들 래퍼 컴포넌트
│   {children}       │
│ </ProtectedRoute>  │
└──────────┬─────────┘
           │
      로그인 상태?
      ┌─────┴─────┐
      YES         NO
       │           │
       ▼           ▼
   children   <Navigate to="/login" replace/>
   (정상 렌더)      │
                   ▼
              /login 으로 이동
```

## ✅ 구현 요구사항

### Part A — 404 페이지

- [ ] `src/pages/NotFound.jsx` 생성 (큰 "404" + "홈으로" `<Link>`)
- [ ] `App.jsx`의 **맨 마지막**에 catch-all 라우트 추가
  ```jsx
  <Route path="*" element={<NotFound />} />
  ```

### Part B — 로그인 / 마이페이지

- [ ] `src/lib/auth.js` 는 이미 준비되어 있습니다. 열어서 `login()`, `logout()`, `isLoggedIn()`을 확인하세요.
- [ ] `src/pages/Login.jsx` — 큰 "로그인" 버튼 하나. 클릭 시 `auth.login()` 호출 후 `navigate('/mypage', { replace: true })`
- [ ] `src/pages/MyPage.jsx` — "내 마이페이지입니다" + 좋아요한 영화 목록(없으면 안내 문구) + "로그아웃" 버튼
- [ ] `Header.jsx`에 로그인 여부에 따라 "로그인" / "로그아웃" 토글 버튼 추가

### Part C — ProtectedRoute

- [ ] `src/components/ProtectedRoute.jsx` 생성
  ```jsx
  import { Navigate } from 'react-router-dom'
  import { isLoggedIn } from '../lib/auth'

  function ProtectedRoute({ children }) {
    if (!isLoggedIn()) {
      return <Navigate to="/login" replace />
    }
    return children
  }
  export default ProtectedRoute
  ```
- [ ] `App.jsx`의 `/mypage` 라우트를 래퍼로 감쌈
  ```jsx
  <Route
    path="/mypage"
    element={
      <ProtectedRoute>
        <MyPage />
      </ProtectedRoute>
    }
  />
  ```

## 🔍 검증 방법

| 상태 | 조작 | 기대 결과 |
|------|------|----------|
| 로그아웃 상태 | `/mypage` 접근 | `/login`으로 자동 리다이렉트 |
| 로그인 버튼 클릭 | | `/mypage`로 이동, 뒤로가기 해도 `/login`으로 되돌아가지 않음 (replace) |
| 로그인 상태 | `/mypage` 접근 | 정상 렌더 |
| 아무 상태 | `/asdf` 접근 | NotFound 페이지 |
| 로그아웃 버튼 | | Header 표시가 "로그인"으로 바뀜 |

## ⚠️ 흔한 실수

1. **`<Navigate>`에 `replace` 누락 → 뒤로가기 무한 루프**
   ```
   /mypage 접근 → /login 이동 (히스토리에 /mypage 쌓임)
   /login 에서 뒤로가기 → /mypage 접근 → 또 /login 으로 이동...
   ```
   → `<Navigate to="/login" replace/>`로 히스토리를 덮어씌우세요.

2. **`path="*"`를 Routes 최상단에 둠**
   - Routes는 위에서부터 매칭하므로 `*`가 최상단이면 **모든 경로가 404**가 됩니다.
   - 반드시 **맨 마지막**에 두세요.

3. **ProtectedRoute에서 `return` 없이 Navigate 사용**
   ```jsx
   // ❌ JSX가 아닌 함수 바디로 흘러가 아무 일도 안 일어남
   if (!isLoggedIn()) {
     <Navigate to="/login" replace />
   }
   return children

   // ✅ return 필수
   if (!isLoggedIn()) {
     return <Navigate to="/login" replace />
   }
   ```

## 🏆 도전 과제 (선택)

**로그인 후 원래 가려던 페이지로 돌아오기** — 실습#8의 `useLocation`을 사용합니다.

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
```

```jsx
// Login.jsx
const location = useLocation()
const from = location.state?.from?.pathname ?? '/'

function handleLogin() {
  auth.login()
  navigate(from, { replace: true })
}
```

이 도전 과제를 풀었다면 실습#8에서는 다른 것을 해 보세요.

## 💬 Discussion Prompts

1. "서버에서 `/mypage`를 막으면 되는데 왜 클라이언트 라우팅으로도 막나요?"
   → 답: 보안이 아니라 **UX**를 위해서입니다. 사용자 경험상 권한 없는 페이지의 깜빡임을 없애고, 로그인 페이지로 자연스럽게 안내하기 위함. **진짜 권한 검사는 서버에서 반드시** 수행해야 합니다.
2. `isLoggedIn()`이 컴포넌트 상태가 아니라 localStorage에서 **매번 읽는** 함수입니다. 이게 React 렌더 성능/리렌더에 어떤 영향을 줄까요?

## 🆘 막혔을 때

```bash
git checkout solution-실습07 -- src/
```

---

**이전 단계 ←** [실습#6](./실습06-useParams.md) | **다음 단계 →** [실습#8: useSearchParams + useLocation](./실습08-searchParams-location.md)
