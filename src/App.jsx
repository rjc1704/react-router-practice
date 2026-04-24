// ============================================================
// 🗺️ 라우팅 진입점 — 여기가 이 프로젝트의 핵심 학습 파일입니다
// ------------------------------------------------------------
// 모든 페이지/컴포넌트 파일은 이미 구현되어 있습니다.
// 여러분이 할 일은 각 실습에 맞춰 이 파일에서 Routes 구조를 작성하는 것.
//
//   실습#1: 기본 Routes 3개 ( / , /movies , /about )
//   실습#2: <Header /> 를 Routes 바깥에 배치
//   실습#4: /error 라우트 추가
//   실습#5: /movies 를 MoviesLayout 기반 중첩 라우트로 확장
//   실습#6: /movies/:movieId 상세 라우트 추가
//   실습#7: /login, /mypage(보호), 404 라우트 추가
//   실습#8: /search 라우트 추가
// ============================================================

// 실습#1 TODO: 'react-router-dom' 에서 Routes, Route 를 import 하세요
// import { Routes, Route } from 'react-router-dom'

// 실습#2부터 사용
// import Header from './components/Header'

// ---- 페이지 import (필요할 때 주석을 해제하세요) ----
// import Home from './pages/Home'
// import Movies from './pages/Movies'
// import About from './pages/About'

// 실습#4
// import ErrorDemo from './pages/ErrorDemo'

// 실습#5 — 중첩 라우팅
// import MoviesLayout from './pages/MoviesLayout'
// import MoviesIntro from './pages/MoviesIntro'
// import Drama from './pages/genres/Drama'
// import Action from './pages/genres/Action'
// import Romance from './pages/genres/Romance'

// 실습#6
// import MovieDetail from './pages/MovieDetail'

// 실습#7
// import Login from './pages/Login'
// import MyPage from './pages/MyPage'
// import NotFound from './pages/NotFound'
// import ProtectedRoute from './components/ProtectedRoute'

// 실습#8
// import Search from './pages/Search'

function App() {
  return (
    <>
      {/* 실습#1 TODO: <Routes> ... </Routes> 를 작성해 페이지를 연결하세요.
          아래 안내 문구는 지워도 좋습니다. */}
      <div style={{ padding: 32 }}>
        <h1>🎬 CineLog</h1>
        <p>
          실습 진행 순서대로 <code>src/App.jsx</code> 와{' '}
          <code>src/main.jsx</code> 의 TODO 주석을 따라가세요.
        </p>
        <p>
          모든 페이지 파일은 이미 <code>src/pages/</code> 에 준비돼 있습니다.
          여러분이 할 일은 <b>라우팅 구조를 연결</b>하는 것입니다.
        </p>
      </div>
    </>
  )
}

export default App
