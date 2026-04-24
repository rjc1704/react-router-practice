import { NavLink, Link, useNavigate } from 'react-router-dom'
import { isLoggedIn, logout } from '../lib/auth'
import styles from '../styles/layout.module.css'

const getClassName = ({ isActive }) =>
  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink

function Header() {
  const navigate = useNavigate()
  const loggedIn = isLoggedIn()

  function handleSearch(e) {
    if (e.key !== 'Enter') return
    const q = e.target.value.trim()
    if (!q) return
    navigate(`/search?q=${encodeURIComponent(q)}`)
  }

  function handleLogout() {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>🎬 CineLog</Link>

      <nav className={styles.nav}>
        <NavLink to="/"       className={getClassName}>홈</NavLink>
        <NavLink to="/movies" className={getClassName}>영화</NavLink>
        <NavLink to="/about"  className={getClassName}>소개</NavLink>
      </nav>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <input
          type="search"
          className={styles.searchInput}
          placeholder="영화 제목 검색..."
          onKeyDown={handleSearch}
        />

        {loggedIn ? (
          <button
            className={`${styles.button} ${styles.buttonSecondary}`}
            onClick={handleLogout}
          >
            로그아웃
          </button>
        ) : (
          <button className={styles.button} onClick={() => navigate('/login')}>
            로그인
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
