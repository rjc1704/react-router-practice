// ============================================================
// 🎬 공통 헤더 (여러 실습에서 점진적으로 확장되는 파일)
// ------------------------------------------------------------
// 실습#2:  <a href="..."> 를 <Link to="..."> 로 교체
// 실습#3:  Link → NavLink 로 교체 (+ 활성 스타일)
// 실습#7:  로그인/로그아웃 버튼 TODO 주석 해제
// 실습#8:  검색창 TODO 주석 해제
// ============================================================

// 실습#2 TODO 1: 'react-router-dom' 에서 Link 를 import 하세요.
//                (실습#3에서 NavLink 로 교체합니다.)
// import { Link } from 'react-router-dom'

// 실습#7 TODO: 로그인 상태 토글을 위해 아래 import 주석을 해제하세요.
// import { useNavigate } from 'react-router-dom'
// import { isLoggedIn, logout } from '../lib/auth'

import styles from '../styles/layout.module.css'

function Header() {
  // 실습#7 TODO: 아래 2줄 주석을 해제하세요.
  // const navigate = useNavigate()
  // const loggedIn = isLoggedIn()

  // 실습#8 TODO: 검색창의 엔터 핸들러에서 사용할 navigate 가 위에 이미 선언돼 있습니다.
  function handleSearch(e) {
    if (e.key !== 'Enter') return
    const q = e.target.value.trim()
    if (!q) return
    // 실습#8 TODO: navigate(`/search?q=${encodeURIComponent(q)}`) 호출
    alert(`검색: "${q}" — 실습#8 에서 navigate 로 이동 로직을 채우세요.`)
  }

  return (
    <header className={styles.header}>
      {/* 로고 — 클릭 시 홈으로. 실습#2 때 Link 로 바꿔보세요 */}
      <a href="/" className={styles.logo}>🎬 CineLog</a>

      <nav className={styles.nav}>
        {/* 실습#2 TODO 2: 아래 3개의 <a> 를 <Link to="..."> 로 교체하세요.
                          className 은 그대로 둡니다.
            실습#3 에서 Link → NavLink 로 다시 교체하며 활성 스타일을 적용합니다. */}
        <a href="/"       className={styles.navLink}>홈</a>
        <a href="/movies" className={styles.navLink}>영화</a>
        <a href="/about"  className={styles.navLink}>소개</a>
      </nav>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {/* 실습#8 TODO: 아래 input 주석을 해제해 검색창을 활성화하세요 */}
        {/*
        <input
          type="search"
          className={styles.searchInput}
          placeholder="영화 제목 검색..."
          onKeyDown={handleSearch}
        />
        */}

        {/* 실습#7 TODO: 아래 JSX 주석을 해제해 로그인 상태 토글 버튼을 표시하세요 */}
        {/*
        {loggedIn ? (
          <button
            className={`${styles.button} ${styles.buttonSecondary}`}
            onClick={() => { logout(); navigate('/', { replace: true }) }}
          >
            로그아웃
          </button>
        ) : (
          <button className={styles.button} onClick={() => navigate('/login')}>
            로그인
          </button>
        )}
        */}
      </div>
    </header>
  )
}

export default Header
