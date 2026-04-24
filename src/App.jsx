// ============================================================
// 👋 실습#1 시작 위치
// ------------------------------------------------------------
// 목표: 아래 3개의 URL에 서로 다른 페이지를 보여주기
//   - "/"         → Home
//   - "/movies"   → Movies
//   - "/about"    → About
//
// 진행 순서
//   1) src/pages/Home.jsx, Movies.jsx, About.jsx 파일을 만듭니다.
//   2) 각 파일에서 아주 간단한 컴포넌트를 export default 합니다.
//        예) function Home() { return <h1>홈</h1> } export default Home
//   3) 이 파일 상단에서 위 컴포넌트들을 import 하세요.
//   4) 'react-router-dom' 에서 Routes, Route 를 import 하세요.
//   5) 아래 return 의 <>...</> 안에 <Routes> ... </Routes> 구조를
//      작성해 각 경로를 컴포넌트에 연결하세요.
//
// 주의
//   - main.jsx 에서 <App /> 이 <BrowserRouter> 안에 있어야 합니다.
//   - 지금 아래에 남아 있는 Vite 템플릿 코드는 지우고 새로 작성하세요.
// ============================================================

function App() {
  return (
    <>
      {/* TODO: 아래 안내 문구를 지우고 <Routes>...</Routes> 를 작성하세요. */}
      <h1>React Router 실습 시작!</h1>
      <p>
        실습#1: <code>src/App.jsx</code> 파일의 TODO 주석을 따라
        3개의 페이지를 라우팅해 보세요.
      </p>
    </>
  )
}

export default App
