import { useNavigate } from "react-router";
import styles from "../styles/layout.module.css";

function ErrorDemo() {
  const navigate = useNavigate();

  function handleGoHome() {
    navigate("/");
  }

  return (
    <section className={styles.empty}>
      <div className={styles.emptyTitle}>😵</div>
      <h1>무언가 잘못됐습니다</h1>
      <p>홈으로 돌아가서 다시 시도해 주세요.</p>
      <button className={styles.button} onClick={handleGoHome}>
        홈으로 가기
      </button>
    </section>
  );
}

export default ErrorDemo;
