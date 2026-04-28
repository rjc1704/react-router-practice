import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import About from "./pages/About";
import ErrorDemo from "./pages/ErrorDemo";

import MoviesLayout from "./pages/MoviesLayout";
import MoviesIntro from "./pages/MoviesIntro";
import Drama from "./pages/genres/Drama";
import Action from "./pages/genres/Action";
import Romance from "./pages/genres/Romance";

import MovieDetail from "./pages/MovieDetail";

import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import NotFound from "./pages/NotFound";

import Search from "./pages/Search";
import { Route, Routes } from "react-router";

function App() {
  return (
    <>
      <Header />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/error" element={<ErrorDemo />} />

          {/* 중첩 라우팅: /movies + 장르별 */}
          <Route path="/movies" element={<MoviesLayout />}>
            <Route index element={<MoviesIntro />} />
            <Route path="drama" element={<Drama />} />
            <Route path="action" element={<Action />} />
            <Route path="romance" element={<Romance />} />
          </Route>

          {/* 동적 라우팅: 상세 페이지 (중첩 레이아웃 바깥에 둔다 → 전체 화면) */}
          <Route path="/movies/:movieId" element={<MovieDetail />} />

          {/* 인증 */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/mypage"
            element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            }
          />

          {/* 검색 */}
          <Route path="/search" element={<Search />} />

          {/* 위 라우트가 모두 매칭되지 않으면 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
