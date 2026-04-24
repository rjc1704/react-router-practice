# 실습#3 — NavLink 로 현재 페이지 강조

> 관련 교안: **PART 3-2. NavLink로 네비게이션 구현하기**

## 🎯 학습 목표

현재 URL 에 해당하는 메뉴만 자동으로 강조되게 하려고 `<Link>` 대신 `<NavLink>` 를 씁니다. `isActive` 값과 `end` prop 의 쓰임을 이해합니다.

## 🗺️ 동작 그림

```
/ 페이지              /movies 페이지       /movies/drama 페이지
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ [홈] 영화 소개│    │ 홈 [영화] 소개│    │ 홈 [영화] 소개│
│  ^^^         │     │      ^^^^^   │     │      ^^^^^   │
│ active 자동  │     │ active 자동  │     │ 👈 /movies 가 │
└──────────────┘     └──────────────┘     │ /movies/drama 의│
                                           │ 접두사이므로    │
                                           │ 기본 활성화됨    │
                                           └──────────────┘
```

## ✅ 할 일 — `src/components/Header.jsx` 한 파일만 수정

1. `Link` → `NavLink` 로 교체 (import 와 JSX 모두)
2. `className` 에 함수를 전달해 `isActive` 에 따라 `active` 클래스를 붙이고 떼기

```jsx
import { NavLink } from 'react-router-dom'

const getClassName = ({ isActive }) =>
  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink

<NavLink to="/"       className={getClassName}>홈</NavLink>
<NavLink to="/movies" className={getClassName}>영화</NavLink>
<NavLink to="/about"  className={getClassName}>소개</NavLink>
```

## 🧪 `end` prop — 언제 필요한가?

### 🙋 루트 경로 `to="/"` 의 경우 — **end 가 필요 없습니다** ✨

> React Router v7 문서 원문:
> *"NavLink to="/" is an exceptional case ... it **effectively ignores the end prop** and only matches when you're at the root route."*

즉 `<NavLink to="/">`는 **자동으로** 루트일 때만 활성화됩니다. v6 초기의 "모든 페이지에서 홈이 강조되는" 고전적 문제는 이미 내부에서 해결돼 있습니다.

### 🙋 하지만 **하위 경로가 있는 NavLink** 는 여전히 `end` 가 필요합니다

이 현상은 **실습#5 에서 `/movies` 와 `/movies/drama` 가 공존할 때** 체감합니다.

| 선언 | 현재 URL `/movies` | `/movies/drama` |
|------|:---:|:---:|
| `<NavLink to="/movies">전체</NavLink>` (end 없음) | ✅ | ✅ **예상치 못하게 활성!** |
| `<NavLink to="/movies" end>전체</NavLink>` | ✅ | ❌ 정확히 일치할 때만 활성 |

- 실습#3 에서는 `/movies`, `/about` 같은 **형제 레벨** 메뉴만 있으니 `end` 없이도 잘 동작합니다.
- 실습#5 의 사이드바("전체" 링크)에서 `end` 의 위력을 확인하게 됩니다. (`MoviesLayout.jsx` 에 이미 반영돼 있습니다.)

## 🔍 검증 방법

| 주소 | 강조돼야 할 메뉴 |
|------|-----------------|
| `/`          | 홈       |
| `/movies`    | 영화     |
| `/about`     | 소개     |

- DevTools → Elements 탭에서 해당 `<a>` 요소의 `className` 에 `active` 가 토글되는 걸 관찰하세요.

## ⚠️ 흔한 실수

1. **`className="active"` 문자열로만 사용**
   ```jsx
   <NavLink to="/" className="active">홈</NavLink>   // ❌ 항상 활성
   <NavLink to="/" className={({isActive}) => isActive ? 'active' : ''}>홈</NavLink>  // ✅
   ```
2. **CSS Modules 의 `styles.active` 대신 전역 `"active"` 문자열**
   - 이 프로젝트는 CSS Modules 를 쓰므로 `styles.active` 로 참조해야 합니다.

## 🏆 도전 과제 (선택)

`className` 대신 `style` prop 을 함수로 넘기는 버전으로도 구현해 보세요.

```jsx
<NavLink
  to="/movies"
  style={({ isActive }) => ({
    color: isActive ? '#ffd166' : '#ccc',
    fontWeight: isActive ? 700 : 400,
  })}
>영화</NavLink>
```

## 💬 Discussion Prompts

1. `Link` 와 `NavLink` 중 어느 쪽을 기본으로 써야 할까요? 의견을 말해보세요.
2. `end` 가 "기본값 false" 인 이유는 뭘까요? 어떤 UX 에서 접두사 매칭이 더 유용한가요?
   (힌트: `/settings/profile` 에서 `/settings` 링크가 활성되면 자연스러움)

## 🆘 막혔을 때

```bash
git checkout solutions -- src/components/Header.jsx
```

---

**이전 ←** [실습#2](./실습02-link.md) | **다음 →** [실습#4: useNavigate](./실습04-useNavigate.md)
