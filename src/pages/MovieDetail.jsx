import { useParams, useNavigate } from "react-router";
import { findMovieById } from "../data/movies";
import styles from "../styles/layout.module.css";

function MovieDetail() {
  const { movieId } = useParams();
  const movie = findMovieById(movieId);
  const navigate = useNavigate();

  if (!movie) {
    return (
      <section className={styles.empty}>
        <div className={styles.emptyTitle}>🤷</div>
        <h1>영화를 찾을 수 없습니다</h1>
        <p>URL 의 movieId 가 올바른지 확인하세요.</p>
      </section>
    );
  }

  return (
    <section className={styles.detail}>
      <div className={styles.detailPoster}>{movie.poster}</div>
      <div>
        <h1 className={styles.detailTitle}>{movie.title}</h1>
        <p className={styles.detailMeta}>
          {movie.year} · ⭐ {movie.rating} · {movie.genre}
        </p>
        <p className={styles.detailSummary}>{movie.summary}</p>

        <button
          className={`${styles.button} ${styles.buttonSecondary}`}
          style={{ marginTop: 20 }}
          onClick={() => navigate(-1)}
        >
          ← 뒤로
        </button>
      </div>
    </section>
  );
}

export default MovieDetail;
