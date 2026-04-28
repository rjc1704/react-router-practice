// ============================================================
// 🎬 영화 공통 레이아웃 (실습#5 중첩 라우팅용, 강사 사전 제공)
// ------------------------------------------------------------
// 구조:
//   ┌─ 사이드바 (장르 NavLink 4개) ─┐┌─ <Outlet /> 자식 페이지 자리 ─┐
//
// 학생이 할 일:
//   이 파일 자체는 건드릴 필요 없습니다.
//   App.jsx 에서 중첩 Route 구조를 작성하는 것이 핵심입니다.
// ============================================================

import { NavLink, Outlet } from "react-router";
import styles from "../styles/layout.module.css";

const genreClass = ({ isActive }) =>
  isActive ? `${styles.sidebarLink} ${styles.active}` : styles.sidebarLink;

function MoviesLayout() {
  return (
    <section>
      <h1 className={styles.pageTitle}>🎞️ 영화 목록</h1>

      <div className={styles.moviesLayout}>
        <aside className={styles.sidebar}>
          {/* end 가 꼭 필요한 케이스 — /movies 는 하위 /movies/drama 의 접두사 */}
          <NavLink to="/movies" end className={genreClass}>
            전체
          </NavLink>
          <NavLink to="/movies/drama" className={genreClass}>
            드라마
          </NavLink>
          <NavLink to="/movies/action" className={genreClass}>
            액션
          </NavLink>
          <NavLink to="/movies/romance" className={genreClass}>
            로맨스
          </NavLink>
        </aside>

        <div>
          {/* 자식 Route 의 element 가 이 자리에 렌더됩니다 */}
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default MoviesLayout;
