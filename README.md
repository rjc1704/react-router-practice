# 🎬 CineLog — React Router 실습 프로젝트

영화/드라마 리뷰 사이트 "CineLog"를 만들며 React Router의 핵심 기능을 익히는 8단계 실습입니다.

---

## 🎯 학습 목표

8개의 실습을 모두 통과하면 아래 기능이 전부 동작하는 하나의 SPA가 완성됩니다.

- [x] 메인/소개/영화목록 다중 라우팅
- [x] `<Link>`, `<NavLink>`로 새로고침 없이 페이지 전환 + 현재 페이지 강조
- [x] 로그인 성공 후 자동 리다이렉트 (`useNavigate`)
- [x] 공통 레이아웃 + 장르별 중첩 라우팅 (`Outlet`)
- [x] 영화 상세 페이지 `/movies/:movieId` (`useParams`)
- [x] 404 페이지 + 로그인 필요 페이지 접근 제어 (`ProtectedRoute`)
- [x] URL 기반 검색/필터 (`useSearchParams`, `useLocation`)

---

## 📚 실습 목차

| #  | 주제                          | 핵심 API                                       | 문서 |
|----|------------------------------|----------------------------------------------|------|
| 1  | 라우트 3개 만들기             | `BrowserRouter`, `Routes`, `Route`            | [docs/실습01-routes.md](./docs/실습01-routes.md) |
| 2  | Link로 전환하기              | `<Link>`                                      | [docs/실습02-link.md](./docs/실습02-link.md) |
| 3  | NavLink 활성 표시            | `<NavLink>`                                   | [docs/실습03-navlink.md](./docs/실습03-navlink.md) |
| 4  | useNavigate로 프로그램 이동  | `useNavigate`                                 | [docs/실습04-useNavigate.md](./docs/실습04-useNavigate.md) |
| —  | 🔍 중간점검 자가 퀴즈         | —                                             | [docs/중간점검-quiz.md](./docs/중간점검-quiz.md) |
| 5  | Outlet과 중첩 라우팅         | `Outlet`, index Route                         | [docs/실습05-outlet-nested.md](./docs/실습05-outlet-nested.md) |
| 6  | useParams로 상세 페이지      | 동적 세그먼트 `:id`, `useParams`              | [docs/실습06-useParams.md](./docs/실습06-useParams.md) |
| 7  | 404 + 보호 라우트            | `path="*"`, `<Navigate>`                      | [docs/실습07-404-protected.md](./docs/실습07-404-protected.md) |
| 8  | 검색/필터                    | `useSearchParams`, `useLocation`              | [docs/실습08-searchParams-location.md](./docs/실습08-searchParams-location.md) |

---

## 🚀 시작하기

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:5173 접속.

---

## 📁 프로젝트 구조

```
react-router-practice/
├── docs/                      # 실습별 안내 문서 (이곳부터 읽으세요)
├── src/
│   ├── main.jsx               # 앱 진입점 (실습#1에서 BrowserRouter 래핑)
│   ├── App.jsx                # Routes 선언 (실습마다 라우트 추가)
│   ├── pages/                 # 각 페이지 컴포넌트 (실습 진행하며 생성)
│   ├── components/            # 재사용 컴포넌트 (Header, MovieCard 등)
│   ├── data/movies.js         # 영화 시드 데이터 ⚠️ 강사가 미리 제공
│   ├── styles/layout.module.css  # 공통 스타일 ⚠️ 강사가 미리 제공
│   └── lib/auth.js            # (실습#7부터) 가짜 로그인 유틸
└── README.md
```

---

## 🆘 막혔을 때 (solutions 브랜치)

정답은 별도 `solutions` 브랜치에 실습별로 커밋되어 있습니다.

**파일 단위로 정답 가져오기:**
```bash
git fetch origin solutions
git checkout solutions -- src/pages/Home.jsx
```

**특정 실습까지의 전체 상태로 리셋:**
```bash
git fetch --tags origin
git checkout solution-실습03 -- src/
```

> 💡 가능하면 먼저 스스로 해결해 보고, 15분 이상 막히면 정답을 확인하세요.
> 정답을 본 뒤에도 왜 그렇게 작성했는지 이해하고 직접 다시 짜 보는 것이 중요합니다.

---

## ❓ FAQ

**Q. `Uncaught Error: useNavigate() may be used only in the context of a <Router> component.`**
→ `main.jsx`에서 `<App />`을 `<BrowserRouter>`로 감싸지 않았거나, 테스트 중 컴포넌트가 Router 바깥에 있습니다.

**Q. React Router v7이 설치됐는데 왜 v6 문법을 쓰나요?**
→ v7의 `react-router-dom`은 v6의 선언적 API(`BrowserRouter`, `Routes`, `Route` 등)를 100% 하위 호환 재노출합니다. 이 실습에서는 **URL ↔ 컴포넌트 매핑**이라는 핵심 개념을 흐리지 않기 위해 v6 스타일로 배웁니다. v7의 `createBrowserRouter` + loader/action 패턴은 다음 과정에서 다룹니다.

**Q. import는 어떻게 써야 하나요?**
→ 모든 실습에서 `react-router-dom`에서 import합니다. `react-router`(dom 없음)는 **사용하지 마세요** — 구글/AI 검색 시 v7 framework mode 예제가 혼재돼 혼란을 유발합니다.
```jsx
// ✅ 올바른 import
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'

// ❌ 이 실습에서는 사용하지 말 것
import { createBrowserRouter } from 'react-router'
```

**Q. 카운트가 초기화됩니다.**
→ `<Header />`를 `<Routes>` 안쪽에 둔 경우 매 페이지 전환마다 재마운트됩니다. Routes 바깥에 배치하세요.

**Q. `NavLink`의 `active` 스타일이 홈에도 항상 붙어요.**
→ `path="/"`는 모든 경로의 접두사이기 때문입니다. `<NavLink to="/" end>`처럼 `end` prop을 추가하세요.

---

## 🧑‍🏫 강사용 노트

- 각 실습 문서 끝의 **도전 과제**는 빠르게 끝낸 학생용 보너스입니다.
- 실습#5 직전 [중간점검 퀴즈](./docs/중간점검-quiz.md)로 학생들의 개념 정착을 점검하세요.
- **흔한 실수** 항목은 실제로 일부러 재현해 보여주면 학습 효과가 큽니다.
