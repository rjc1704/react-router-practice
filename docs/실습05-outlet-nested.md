# 실습#5 — Outlet 과 중첩 라우팅

> 관련 교안: **PART 4-1, 4-2. Outlet, 중첩 라우팅**

## 🎯 학습 목표

공통 레이아웃(헤더 + 사이드바)은 그대로 두고 **본문만 교체**되는 중첩 라우팅 구조를 직접 조립합니다. 핵심은 **`App.jsx` 의 Route 중첩 선언**과 **`<Outlet />` 의 동작** 이해.

## 🗺️ Outlet 그림

```
/movies/drama 접속
        ▼
┌──────────────────────────────────────────┐
│  <Header />                              │ ← 항상 고정
├──────────────────────────────────────────┤
│  ┌──────────┐  ┌─────────────────────┐   │
│  │ Sidebar  │  │                     │   │
│  │ ─ 드라마 │  │    <Outlet />       │ ← 이 자리에 자식 Route 가 들어옴
│  │   액션   │  │  = <Drama /> 렌더   │   │
│  │   로맨스 │  │                     │   │
│  └──────────┘  └─────────────────────┘   │
└──────────────────────────────────────────┘
```

## ✅ 할 일 — `src/App.jsx` 한 파일만 수정

**모든 페이지는 이미 준비돼 있습니다:**
- `pages/MoviesLayout.jsx` — 사이드바 + `<Outlet />` 가 구현된 레이아웃 (건드릴 필요 없음)
- `pages/MoviesIntro.jsx` — `/movies` 접속 시 보일 index 페이지
- `pages/genres/Drama.jsx`, `Action.jsx`, `Romance.jsx` — 장르별 영화 카드 목록

여러분은 **App.jsx** 의 `/movies` 부분을 **중첩 Route 구조**로 재작성하면 됩니다.

```jsx
import MoviesLayout from './pages/MoviesLayout'
import MoviesIntro from './pages/MoviesIntro'
import Drama from './pages/genres/Drama'
import Action from './pages/genres/Action'
import Romance from './pages/genres/Romance'

<Routes>
  <Route path="/" element={<Home />} />

  {/* 기존: <Route path="/movies" element={<Movies />} /> 를 아래로 교체 */}
  <Route path="/movies" element={<MoviesLayout />}>
    <Route index              element={<MoviesIntro />} />
    <Route path="drama"       element={<Drama />} />
    <Route path="action"      element={<Action />} />
    <Route path="romance"     element={<Romance />} />
  </Route>

  <Route path="/about" element={<About />} />
  <Route path="/error" element={<ErrorDemo />} />
</Routes>
```

### 자식 path 규칙 ⚠️

```jsx
<Route path="drama" .../>    // ✅ 부모 /movies 에 이어붙어 /movies/drama
<Route path="/drama" .../>   // ❌ 앞 슬래시 쓰면 절대경로가 되어 /drama 로 동작
```

## 🔍 검증 방법

| 주소 | 기대 결과 |
|------|----------|
| `/movies`         | 사이드바 + "장르를 선택하세요" (index Route) |
| `/movies/drama`   | 본문만 드라마 카드 목록으로 교체 (헤더/사이드바 유지) |
| `/movies/action`  | 사이드바 "액션" 활성화 + 액션 카드 목록 |
| 사이드바에서 "전체" | `/movies` 로 이동, "전체"만 강조 (end prop 덕분) |

## ⚠️ 흔한 실수

1. **`<Outlet />` 누락 → 빈 화면** (실습에서는 MoviesLayout 에 이미 포함돼 있으니 실수하지 말라고 강조)
2. **자식 Route path 에 `/` 접두사** → 절대 경로가 됨
3. **index Route 누락 → `/movies` 접속 시 본문이 빈 화면**
4. **사이드바 "전체" 링크에 `end` 누락 → `/movies/drama` 에서도 "전체"가 활성화됨**
   - MoviesLayout.jsx 에는 이미 `end` 가 들어있습니다. "실습#3 에서 배운 `end` 가 여기서 필요하다"를 체감하세요.

## 🏆 도전 과제 (선택)

`<Route index element={<MoviesIntro />}/>` 대신
**`<Route index element={<Navigate to="drama" replace />}/>`** 로 바꿔, `/movies` 접속 시 자동으로 `/movies/drama` 로 이동시켜 보세요. (Navigate 예고편)

## 💬 Discussion Prompts

1. 중첩 라우팅 없이 같은 화면을 만들려면 각 장르 페이지마다 헤더/사이드바를 어떻게 반복해야 할까요?
2. `<Outlet context={...}/>` 는 어떤 상황에서 유용할까요? 공식 문서에서 찾아보세요.

## 🆘 막혔을 때

```bash
git checkout solutions -- src/App.jsx
```

---

**이전 ←** [중간점검 퀴즈](./중간점검-quiz.md) | **다음 →** [실습#6: useParams](./실습06-useParams.md)
