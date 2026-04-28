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
import { NavLink } from 'react-router'

const getClassName = ({ isActive }) =>
  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink

<NavLink to="/"       className={getClassName}>홈</NavLink>
<NavLink to="/movies" className={getClassName}>영화</NavLink>
<NavLink to="/about"  className={getClassName}>소개</NavLink>
```
