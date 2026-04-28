import { useSearchParams } from "react-router";
import { movies } from "../data/movies";
import MovieCard from "../components/MovieCard";
import styles from "../styles/layout.module.css";

const GENRES = [
  { key: "all", label: "전체" },
  { key: "drama", label: "드라마" },
  { key: "action", label: "액션" },
  { key: "romance", label: "로맨스" },
];

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q") ?? "";
  const genre = searchParams.get("genre") ?? "all";

  const filtered = movies.filter((m) => {
    const hit = q === "" || m.title.includes(q);
    const ok = genre === "all" || m.genre === genre;
    return hit && ok;
  });

  function handleGenreChange(newGenre) {
    // 기존 q 를 유지한 채 genre 만 갱신 (setSearchParams 는 덮어쓰기이므로 머지 필요)
    setSearchParams({ q, genre: newGenre });
  }

  return (
    <section>
      <h1 className={styles.pageTitle}>🔍 검색 결과</h1>
      <p>
        "<b>{q || "(검색어 없음)"}</b>" — 총 {filtered.length}편
      </p>

      <div style={{ display: "flex", gap: 8, margin: "16px 0" }}>
        {GENRES.map((g) => (
          <button
            key={g.key}
            className={`${styles.button} ${genre === g.key ? "" : styles.buttonSecondary}`}
            onClick={() => handleGenreChange(g.key)}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className={styles.cardGrid}>
        {filtered.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </section>
  );
}

export default Search;
