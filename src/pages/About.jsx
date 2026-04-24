// ============================================================
// ℹ️ 소개 페이지 (완성 — 건드릴 것 없음)
// ============================================================

import styles from '../styles/layout.module.css'

function About() {
  return (
    <section>
      <h1 className={styles.pageTitle}>ℹ️ CineLog 소개</h1>
      <p>
        CineLog는 React Router 학습용 실습 프로젝트입니다.
        8개의 실습을 통과하면 이 사이트의 모든 라우팅 기능이 완성됩니다.
      </p>
    </section>
  )
}

export default About
