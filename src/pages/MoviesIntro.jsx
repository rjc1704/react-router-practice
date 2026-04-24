// ============================================================
// 🎯 영화 목록 index 페이지 (실습#5, 강사 제공)
// ------------------------------------------------------------
// App.jsx 에서 <Route index element={<MoviesIntro />}/> 로 연결하면
// /movies 기본 화면에 표시됩니다.
// ============================================================

function MoviesIntro() {
  return (
    <div style={{ padding: 40, color: '#666', textAlign: 'center' }}>
      ← 왼쪽에서 장르를 선택하세요
    </div>
  )
}

export default MoviesIntro
