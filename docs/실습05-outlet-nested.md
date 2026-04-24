# 실습#5 — Outlet과 중첩 라우팅

> 관련 교안: **PART 4-1, 4-2. Outlet, 중첩 라우팅**

## 🎯 학습 목표

공통 레이아웃(헤더 + 사이드바)을 **한 번만** 정의하고, 하위 페이지만 교체되는 중첩 라우팅 구조를 직접 만들어 봅니다.

## 🗺️ Outlet 그림

```
/movies/drama 접속
        │
        ▼
┌──────────────────────────────────────────┐
│  <Header />                              │ ← 항상 고정
├──────────────────────────────────────────┤
│  ┌──────────┐  ┌─────────────────────┐   │
│  │ Sidebar  │  │                     │   │
│  │ ─ 드라마 │  │    <Outlet />       │ ← 여기만 교체
│  │   액션   │  │  = <Drama /> 렌더   │   │
│  │   로맨스 │  │                     │   │
│  └──────────┘  └─────────────────────┘   │
└──────────────────────────────────────────┘
       │
  사이드바에서 "액션" 클릭
       ▼
┌──────────────────────────────────────────┐
│  <Header />                              │ ← 유지
├──────────────────────────────────────────┤
│  ┌──────────┐  ┌─────────────────────┐   │
│  │ Sidebar  │  │    <Action /> 로    │   │
│  │          │  │     내용만 교체     │   │
│  └──────────┘  └─────────────────────┘   │
└──────────────────────────────────────────┘
```

## ✅ 구현 요구사항

- [ ] **TODO 1:** `src/pages/MoviesLayout.jsx` 생성
  - 좌측 사이드바에 `<NavLink>` 3개 (드라마/액션/로맨스)
  - `<Outlet />`을 우측에 배치
- [ ] **TODO 2:** 장르별 페이지 3개 생성 (`src/pages/genres/Drama.jsx`, `Action.jsx`, `Romance.jsx`)
  - 각 파일에서 `data/movies.js`의 `getMoviesByGenre('drama')` 등을 호출해 `MovieCard` 목록 렌더
- [ ] **TODO 3:** `App.jsx`에 중첩 라우트 등록
  ```jsx
  <Route path="/movies" element={<MoviesLayout />}>
    <Route index            element={<MoviesIntro />} />
    <Route path="drama"     element={<Drama />} />
    <Route path="action"    element={<Action />} />
    <Route path="romance"   element={<Romance />} />
  </Route>
  ```
- [ ] **TODO 4:** index 라우트용 `MoviesIntro.jsx` 작성 — "좌측에서 장르를 선택하세요" 같은 안내 문구.

### 자식 경로 path 규칙 ⚠️

```jsx
// ❌ 절대 경로로 작성하면 안 됨
<Route path="/drama" element={<Drama />} />

// ✅ 자식 Route의 path는 부모에 이어 붙여집니다
<Route path="drama" element={<Drama />} />
// 실제 URL: /movies/drama
```

## 🔍 검증 방법

| 주소 | 기대 결과 |
|------|----------|
| `/movies` | 헤더 + 사이드바 + "장르를 선택하세요" 안내 (index Route) |
| `/movies/drama` | 헤더 + 사이드바 + 드라마 영화 카드 목록 |
| `/movies/action` | 본문만 액션 목록으로 교체 (헤더/사이드바 유지) |
| 사이드바 링크 | 현재 장르가 강조됨 (NavLink active) |
| 주소창에 `/movies/romance` 직접 입력 | 같은 결과. 링크 공유 가능 확인 |

## ⚠️ 흔한 실수

1. **Outlet을 빼먹고 빈 화면**
   - 자식 라우트가 매칭되어도 `<Outlet/>`이 없으면 어디에 그릴지 모릅니다.
2. **자식 Route path에 `/` 접두사**
   - `/drama`로 쓰면 부모를 무시하고 루트 기준 절대 경로가 됩니다.
3. **index Route 없이 `/movies` 접속 → 우측이 빈 화면**
   - 깨진 것처럼 보입니다. `<Route index element={...}/>`로 기본 페이지를 반드시 지정하세요.

## 🏆 도전 과제 (선택)

- `<Route index element={<MoviesIntro/>}/>` 대신 **`<Navigate to="drama" replace/>`로 자동 리다이렉트** 시켜 보세요. `/movies` 접속 시 바로 `/movies/drama`로 튀어야 합니다. (실습#7의 Navigate 예고편)

## 💬 Discussion Prompts

1. 중첩 라우팅 없이 이 화면을 만들려면 각 장르 페이지마다 헤더/사이드바를 어떻게 반복해야 할까요? 유지보수 비용이 어떻게 달라지나요?
2. `<Outlet context={...}/>` 라는 기능도 있습니다. 이건 어떤 상황에서 쓸까요? 공식 문서에서 찾아보세요.

## 🆘 막혔을 때

```bash
git checkout solution-실습05 -- src/
```

---

**이전 단계 ←** [중간점검 퀴즈](./중간점검-quiz.md) | **다음 단계 →** [실습#6: useParams](./실습06-useParams.md)
