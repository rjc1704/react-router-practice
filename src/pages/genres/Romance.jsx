import { Link } from "react-router";
import { getMoviesByGenre } from "../../data/movies";
import MovieCard from "../../components/MovieCard";
import styles from "../../styles/layout.module.css";

function Romance() {
  const items = getMoviesByGenre("romance");

  return (
    <div className={styles.cardGrid}>
      {items.map((movie) => (
        <Link
          key={movie.id}
          to={`/movies/${movie.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <MovieCard movie={movie} />
        </Link>
      ))}
    </div>
  );
}

export default Romance;
