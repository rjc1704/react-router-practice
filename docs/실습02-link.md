# 실습#2 — Link로 전환하기

> 관련 교안: **PART 3-1. Link로 이동하기**

## 🎯 학습 목표

`<a href>` 와 `<Link to>` 의 차이를 **DevTools Network 탭**으로 직접 확인하고, SPA 특유의 "새로고침 없는 전환"을 체감합니다.

## 🗺️ 비교 그림

```
<a href="/movies">              <Link to="/movies">
       │                                │
   클릭 ▼                            클릭 ▼
 서버에 /movies 요청 📡          URL만 바꿈 (서버 요청 없음)
       ▼                                ▼
 HTML 전체 새로 받음              JS가 화면만 교체
       ▼                                ▼
 ❌ 전체 새로고침 / 상태 초기화   ✅ 부드러운 전환 / 상태 유지
```

## ✅ 할 일 (2개 파일만 건드립니다)

### 1️⃣ `src/App.jsx` — Header 배치

```jsx
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'      // ← 추가
import Home from './pages/Home'
import Movies from './pages/Movies'
import About from './pages/About'

function App() {
  return (
    <>
      <Header />                                {/* ← Routes 바깥 */}
      <Routes>
        <Route path="/"       element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/about"  element={<About />} />
      </Routes>
    </>
  )
}
```

> 💡 **왜 `<Routes>` 바깥?** 안쪽에 두면 페이지가 바뀔 때마다 Header 가 **재마운트**되어 내부 state(로그인 상태 등)가 날아갑니다.

### 2️⃣ `src/components/Header.jsx` — `<a>` → `<Link>` 교체

파일을 열면 현재 `<a href="...">` 버전으로 작성돼 있습니다. 여러분이 할 일:

- **TODO 1:** `react-router-dom`에서 `Link` import
- **TODO 2:** 3개의 `<a>`를 모두 `<Link>`로 교체 (`href` → `to`)
- 로고 `<a href="/">🎬 CineLog</a>` 도 `<Link to="/">` 로 바꿔도 좋습니다.

```jsx
// Before
<a href="/"       className={styles.navLink}>홈</a>

// After
<Link to="/"       className={styles.navLink}>홈</Link>
```

## 🧪 체감 실험 — 카운터 상태 유지 확인

Home 페이지에 이미 `useState` 카운터가 박혀 있습니다. 순서대로 해보세요:

1. 홈에서 카운트 버튼을 **3번 이상** 클릭
2. "영화" 메뉴로 이동
3. 다시 "홈"으로 돌아옴

| Before(`<a>`) | After(`<Link>`) |
|---|---|
| 카운트가 **0으로 초기화** 됨 | 카운트 **유지됨** 🎉 |

## 🔍 검증 방법

| 검증 항목 | 기대 결과 |
|----------|----------|
| DevTools → Network 탭 → Doc | Link 클릭 시 문서 재요청이 **없다** |
| 카운트 올린 뒤 페이지 이동 후 복귀 | 카운트가 **유지됨** |
| F5 새로고침 | 카운트 초기화됨 (정상 — SPA 재진입) |

## ⚠️ 흔한 실수

1. **`to=` 대신 `href=`**
   ```jsx
   <Link href="/movies">영화</Link>   // ❌ 그냥 <a> 로 동작
   <Link to="/movies">영화</Link>     // ✅
   ```
2. **`<Header />`를 `<Routes>` 안쪽에 배치** → 재마운트되어 상태 유실

## 🏆 도전 과제 (선택)

`<Link>` 는 JSX child 를 자유롭게 받습니다. 로고 자리에 이모지+텍스트를 Link 하나로 묶어보세요.

## 💬 Discussion Prompts

1. `<Link>` 는 결국 DOM 에 `<a>` 로 렌더되는데 왜 서버 요청이 안 갈까요? (힌트: `onClick` 에서 `preventDefault`)
2. 카운트가 유지되는 건 "컴포넌트가 언마운트되지 않는다"는 뜻입니다. MPA 에서는 왜 불가능할까요?

## 🆘 막혔을 때

```bash
git checkout solutions -- src/App.jsx src/components/Header.jsx
```

---

**이전 ←** [실습#1](./실습01-routes.md) | **다음 →** [실습#3: NavLink](./실습03-navlink.md)
