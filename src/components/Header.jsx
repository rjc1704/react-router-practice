// ============================================================
// 👋 실습#2 시작 위치 — 네비게이션 바
// ------------------------------------------------------------
// Step A. 먼저 <a href="..."> 로 작성 → Network 탭에서 문서 재요청 관찰
// Step B. <a> 를 <Link to="..."> 로 교체 → 문서 재요청이 사라지는지 관찰
//
// 실습#3에서 이어서 <NavLink> 로 교체해 현재 페이지 강조를 구현합니다.
// ============================================================

import styles from '../styles/layout.module.css'

// TODO 1: 'react-router-dom' 에서 Link 를 import 하세요.
//         (실습#3에서는 NavLink 로 교체합니다.)
// import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className={styles.header}>
      {/* 로고 — 클릭 시 홈으로 이동하도록 추후 Link 로 바꿔보세요 */}
      <a href="/" className={styles.logo}>🎬 CineLog</a>

      <nav className={styles.nav}>
        {/* TODO 2: 아래 3개의 <a> 를 <Link to="..."> 로 교체하세요.
                    교체 후 className 은 그대로 유지합니다. */}
        <a href="/"       className={styles.navLink}>홈</a>
        <a href="/movies" className={styles.navLink}>영화</a>
        <a href="/about"  className={styles.navLink}>소개</a>
      </nav>
    </header>
  )
}

export default Header
