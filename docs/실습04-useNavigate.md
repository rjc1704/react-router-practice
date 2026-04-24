# 실습#4 — useNavigate로 버튼 클릭 이동

> 관련 교안: **PART 3-3. useNavigate로 버튼 클릭 시 페이지 이동하기**

## 🎯 학습 목표

**이벤트 핸들러 / 비동기 콜백 내부**에서 코드로 페이지를 이동해야 할 때 `useNavigate` 훅을 사용하는 법을 익힙니다. Link/NavLink로는 안 되는 상황을 이해합니다.

## 🗺️ 언제 Link 대신 useNavigate를 쓰나?

```
          ┌─────────────────────────────────────┐
          │ 누가 페이지 이동을 트리거하는가?      │
          └───────────────┬─────────────────────┘
                          │
       ┌──────────────────┼──────────────────┐
       ▼                  ▼                  ▼
 사용자가 직접     로그인 성공 후      에러 발생 시
 링크를 클릭      API 응답 받고 나서   자동으로
       │                  │                  │
       ▼                  ▼                  ▼
    <Link>          useNavigate()      useNavigate()
     <NavLink>
```

**한 줄 요약:** "사용자가 클릭할 뭔가가 있다" → Link, "코드로 이동시켜야 한다" → useNavigate.

## ✅ 구현 요구사항

- [ ] **TODO 1:** `Home.jsx`에 "영화 구경하기" 버튼 추가 → 클릭 시 `/movies`로 이동
- [ ] **TODO 2:** `Movies.jsx`에 "← 뒤로" 버튼 추가 → 클릭 시 `navigate(-1)`
- [ ] **TODO 3:** `/error` 임시 페이지(`pages/ErrorDemo.jsx`)를 하나 만들고 App.jsx에 등록
  - "홈으로" 버튼 → `navigate('/')` 클릭
  - **왜 굳이 이 페이지?** 실습#7의 "로그인 후 리다이렉트" 감각을 미리 잡기 위함입니다.

### 패턴 예시

```jsx
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  function goToMovies() {
    navigate('/movies')
  }

  return (
    <>
      <h1>홈</h1>
      <button onClick={goToMovies}>영화 구경하기</button>
    </>
  )
}
```

## 🔍 검증 방법

| 조작 | 기대 결과 |
|------|----------|
| Home의 "영화 구경하기" 클릭 | URL이 `/movies`로 바뀐다 |
| Movies의 "뒤로" 클릭 | `/`로 돌아간다 (브라우저 뒤로가기와 동일) |
| 뒤로가기 스택 확인 | 여러 번 이동 후 브라우저 뒤로가기로도 정상 복귀 |

## ⚠️ 흔한 실수

1. **컴포넌트 바깥에서 훅 호출**
   ```jsx
   // ❌ 컴포넌트 밖에서는 훅을 쓸 수 없습니다
   const navigate = useNavigate()

   function handleClick() {
     navigate('/movies')
   }

   function Home() { return <button onClick={handleClick}>이동</button> }
   ```
   → `useNavigate()`는 **컴포넌트 함수 안에서** 호출해야 합니다.

2. **렌더 중 `navigate()` 호출**
   ```jsx
   // ❌ 렌더 중 부수효과 발생 → 무한 루프
   function Home() {
     const navigate = useNavigate()
     navigate('/movies')   // 렌더마다 실행 → 또 렌더 → 또 실행...
     return <h1>홈</h1>
   }
   ```
   → 이런 "렌더 시점 리다이렉트"는 `<Navigate/>` 컴포넌트를 쓰거나 (실습#7) `useEffect` 안에서 처리하세요.

## 🏆 도전 과제 (선택)

- `navigate('/movies', { replace: true })`와 일반 `navigate('/movies')`의 차이를 **브라우저 뒤로가기**로 확인해 보세요.
- 현재 URL을 history에 **남기지 않고** 대체하고 싶을 때(예: 로그인 페이지 → 홈) `replace: true`를 씁니다.

## 💬 Discussion Prompts

1. 만약 `useNavigate`가 없다면, 로그인 API 성공 후 홈으로 어떻게 보낼 수 있을까요? `window.location.href = '/'` 와는 어떤 점이 다른가요?
2. `navigate(-1)`은 어떻게 구현됐을까요? 브라우저의 `history.back()`과 같은지 다른지 찾아보세요.

## 🆘 막혔을 때

```bash
git checkout solution-실습04 -- src/
```

---

**이전 단계 ←** [실습#3](./실습03-navlink.md) | **다음 단계 →** [🔍 중간점검 퀴즈](./중간점검-quiz.md) → [실습#5: Outlet](./실습05-outlet-nested.md)
