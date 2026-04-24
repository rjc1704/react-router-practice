# 실습#2 — Link로 전환하기

> 관련 교안: **PART 3-1. Link로 이동하기**

## 🎯 학습 목표

`<a href>`와 `<Link to>`의 차이를 **직접 네트워크 탭으로 확인**하고, 새로고침 없이 페이지가 전환되는 SPA의 느낌을 체감합니다.

## 🗺️ 비교 그림

```
<a href="/movies">              <Link to="/movies">
       │                                │
   클릭 ▼                            클릭 ▼
┌──────────────────┐           ┌──────────────────┐
│ 브라우저가 서버에  │           │ React Router가    │
│ /movies 요청 📡   │           │ URL만 바꿈 (요청 X)│
└────────┬─────────┘           └────────┬─────────┘
         ▼                              ▼
  HTML 전체 새로 받음              JS가 화면 교체
         ▼                              ▼
  ❌ 페이지 전체 새로고침        ✅ 새로고침 없이 전환
  ❌ 상태 초기화 됨              ✅ 상태 유지
```

## ✅ 구현 요구사항

- [ ] **(사전)** `src/components/Header.jsx` 파일을 만드세요. (또는 스타터가 이미 있다면 열어서 TODO를 따르세요.)
- [ ] **TODO 1:** 먼저 **일부러 `<a href="...">` 태그로** 네비게이션을 작성해서 동작을 확인하세요.
  - 홈 / 영화 / 소개 3개 링크
- [ ] **TODO 2:** 브라우저 DevTools → Network 탭을 열고 링크를 클릭해서 **문서가 매번 재요청되는지** 확인하세요.
- [ ] **TODO 3:** 이제 `<a>` → `<Link to="...">` 로 바꾸고, **이번에는 문서 재요청이 일어나지 않는지** 확인하세요.
- [ ] **TODO 4:** `App.jsx`에서 `<Routes>` **바깥에** `<Header />`를 배치해, 모든 페이지에서 공통으로 보이게 하세요.

### 체감 실험 — Home에 카운터 심기

이 실험을 꼭 해보세요. SPA의 장점을 강렬하게 체험할 수 있습니다.

```jsx
// src/pages/Home.jsx
import { useState } from 'react'

function Home() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <h1>홈</h1>
      <button onClick={() => setCount(count + 1)}>
        카운트: {count}
      </button>
    </div>
  )
}
export default Home
```

- `<a>` 네비게이션: 카운트를 3까지 올린 뒤 "영화"로 이동 → 다시 "홈"으로 돌아오면 **카운트가 0으로 초기화** 됨
- `<Link>` 네비게이션: 같은 흐름에서 **카운트가 유지됨** 🎉

## 🔍 검증 방법

| 검증 항목 | 기대 결과 |
|----------|----------|
| 네비게이션 어디에서든 클릭 | 주소가 바뀌고 해당 페이지가 렌더됨 |
| DevTools Network 탭 → Fetch/XHR 및 Doc | 링크 클릭 시 document 재요청이 **없다** |
| Home 카운터 올리기 → 영화 이동 → 홈 복귀 | 카운터가 **유지됨** |
| 새로고침 (F5) | 카운터는 초기화됨 (새로고침은 SPA 재진입이므로 정상) |

## ⚠️ 흔한 실수

1. **`to=` 대신 `href=`**
   ```jsx
   // ❌ Link에 href 쓰면 그냥 <a> 로 동작
   <Link href="/movies">영화</Link>

   // ✅
   <Link to="/movies">영화</Link>
   ```

2. **`<Header />`를 `<Routes>` 안쪽에 둠**
   - 페이지가 바뀔 때마다 Header가 **재마운트** 됩니다. 로그인 상태 같은 Header 내부 state가 날아갑니다.
   ```jsx
   // ❌
   <Routes>
     <Route path="/" element={<><Header/><Home/></>} />
     <Route path="/movies" element={<><Header/><Movies/></>} />
   </Routes>

   // ✅
   <>
     <Header />
     <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/movies" element={<Movies/>} />
     </Routes>
   </>
   ```

## 🏆 도전 과제 (선택)

- `<Link>` 안에 텍스트 대신 이미지나 아이콘(예: `🎬`)을 넣어보세요. `<Link>`는 JSX child를 자유롭게 받습니다.
- `<Link to="/movies" target="_blank">`는 어떻게 동작하나요? 왜 그럴까요?

## 💬 Discussion Prompts

1. `<Link>`는 내부적으로 `<a>` 태그로 렌더됩니다. 그런데 왜 서버에 요청이 안 갈까요?
   (힌트: Link는 `onClick`에서 `event.preventDefault()`를 호출합니다.)
2. 카운트 상태가 유지되는 것의 본질은 "컴포넌트가 언마운트되지 않는다"는 뜻입니다. 이게 왜 MPA와 다를까요?

## 🆘 막혔을 때

```bash
git checkout solution-실습02 -- src/
```

---

**이전 단계 ←** [실습#1](./실습01-routes.md) | **다음 단계 →** [실습#3: NavLink](./실습03-navlink.md)
