# 실습#3 — NavLink로 현재 페이지 강조

> 관련 교안: **PART 3-2. NavLink로 네비게이션 구현하기**

## 🎯 학습 목표

`<Link>`를 `<NavLink>`로 교체하여 **현재 보고 있는 페이지의 링크만 자동으로 강조**되는 UX를 구현합니다. `isActive` 값과 `end` prop의 필요성을 이해합니다.

## 🗺️ 개념 그림

```
/ 페이지:               /movies 페이지:
┌──────────────────┐   ┌──────────────────┐
│ [홈] 영화 소개    │   │ 홈 [영화] 소개    │
│  ^^^             │   │      ^^^^^       │
│  active 자동 부여 │   │   active 자동 부여 │
└──────────────────┘   └──────────────────┘

NavLink 는 내부적으로:
  현재 URL === to 의 값  →  isActive = true
                        →  className 에 'active' 자동 추가
```

## ✅ 구현 요구사항

- [ ] **TODO 1:** `Header.jsx`에서 `Link`를 `NavLink`로 교체
- [ ] **TODO 2:** `className`을 함수 형태로 바꿔 `isActive`에 따라 `active` 클래스 부여
  ```jsx
  className={({ isActive }) =>
    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
  }
  ```
- [ ] **TODO 3:** 모든 페이지에서 "홈"이 항상 강조되는 현상을 직접 확인하세요.
  - 이유는 `path="/"`가 **모든 경로의 접두사**이기 때문입니다 (`/movies`도 `/`로 시작).
- [ ] **TODO 4:** 홈 NavLink에만 `end` prop을 추가해서 해결
  ```jsx
  <NavLink to="/" end className={...}>홈</NavLink>
  ```

## 🔍 검증 방법

| 주소 | 강조돼야 할 링크 |
|------|-----------------|
| `/`          | 홈        |
| `/movies`    | 영화      |
| `/about`     | 소개      |

- DevTools → Elements 탭에서 해당 `<a>` 요소의 className에 `active`가 붙었다 떨어졌다 하는 것을 관찰하세요.

## ⚠️ 흔한 실수

1. **`className="active"` 문자열로만 작성**
   ```jsx
   // ❌ 항상 active 클래스가 붙음 — NavLink 기능 무의미
   <NavLink to="/" className="active">홈</NavLink>

   // ✅ 함수를 넘겨야 isActive 에 따라 분기됨
   <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>홈</NavLink>
   ```

2. **`end` prop 누락 → 홈이 모든 페이지에서 활성**
   - 이것은 **버그가 아니라 NavLink의 기본 동작**입니다. `to="/"`는 접두사 매칭이라 `/movies`에서도 match됩니다.
   - 정확히 `/`일 때만 활성화하려면 `end`를 추가하세요.

## 🏆 도전 과제 (선택)

`className` 대신 `style` prop도 함수형을 지원합니다. 아래 패턴으로도 작성해 보세요.

```jsx
<NavLink
  to="/movies"
  style={({ isActive }) => ({
    color: isActive ? '#ffd166' : '#ccc',
    fontWeight: isActive ? 700 : 400,
  })}
>
  영화
</NavLink>
```

> CSS Modules 없이 인라인 스타일만으로도 같은 효과를 낼 수 있습니다. 상황에 따라 골라 쓰세요.

## 💬 Discussion Prompts

1. `Link`와 `NavLink`는 언제 각각 쓰는 게 좋을까요?
   (힌트: "현재 페이지를 알아야 하는 위치인지"가 기준)
2. `end` prop은 왜 "기본값 false"일까요? 어떤 UX에서 접두사 매칭이 더 유용할까요?
   (예: `/settings/profile`에서 `/settings` 링크가 활성되길 원하는 경우)

## 🆘 막혔을 때

```bash
git checkout solution-실습03 -- src/
```

---

**이전 단계 ←** [실습#2](./실습02-link.md) | **다음 단계 →** [실습#4: useNavigate](./실습04-useNavigate.md)
