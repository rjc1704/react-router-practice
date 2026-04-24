// 실습용 정적 영화 데이터 시드
// 실습#5부터 사용됩니다. 실제 프로젝트에서는 서버 API를 호출하겠지만,
// 이 실습은 "라우팅"에 집중하기 위해 고정된 데이터를 사용합니다.
//
// 필드 설명:
//   id:      URL 파라미터로 사용 (예: /movies/1)
//   title:   제목
//   genre:   'drama' | 'action' | 'romance' 중 하나
//   year:    개봉 연도
//   rating:  평점 (1~10)
//   poster:  포스터 이모지 (실제 프로젝트라면 이미지 URL)
//   summary: 짧은 줄거리

export const movies = [
  { id: 1,  title: '오펜하이머',        genre: 'drama',   year: 2023, rating: 8.4, poster: '⚛️', summary: '원자폭탄의 아버지 오펜하이머의 이야기.' },
  { id: 2,  title: '파묘',              genre: 'drama',   year: 2024, rating: 7.2, poster: '⛰️', summary: '험한 것이 나왔다.' },
  { id: 3,  title: '기생충',            genre: 'drama',   year: 2019, rating: 8.6, poster: '🏠', summary: '두 가족의 극단적인 만남.' },
  { id: 4,  title: '존 윅 4',          genre: 'action',  year: 2023, rating: 7.7, poster: '🔫', summary: '전설의 암살자가 돌아왔다.' },
  { id: 5,  title: '매드맥스: 퓨리오사', genre: 'action',  year: 2024, rating: 7.5, poster: '🏜️', summary: '황무지를 가로지르는 복수극.' },
  { id: 6,  title: '범죄도시 4',        genre: 'action',  year: 2024, rating: 7.0, poster: '👊', summary: '마석도 형사가 다시 나선다.' },
  { id: 7,  title: '라라랜드',          genre: 'romance', year: 2016, rating: 8.0, poster: '🎹', summary: '꿈을 좇는 두 사람의 사랑.' },
  { id: 8,  title: '콜 미 바이 유어 네임', genre: 'romance', year: 2017, rating: 7.9, poster: '🍑', summary: '여름, 이탈리아, 첫사랑.' },
  { id: 9,  title: '비포 선라이즈',     genre: 'romance', year: 1995, rating: 8.1, poster: '🚆', summary: '단 하룻밤의 대화와 사랑.' },
  { id: 10, title: '듄: 파트 2',        genre: 'action',  year: 2024, rating: 8.5, poster: '🏜️', summary: '사막 행성 아라키스의 운명.' },
  { id: 11, title: '서울의 봄',         genre: 'drama',   year: 2023, rating: 8.4, poster: '🏛️', summary: '1979년 12월의 9시간.' },
  { id: 12, title: '노트북',            genre: 'romance', year: 2004, rating: 7.8, poster: '📓', summary: '평생을 약속한 연인의 이야기.' },
]

// 편의 함수: id로 영화 찾기
export function findMovieById(id) {
  return movies.find((movie) => movie.id === Number(id))
}

// 편의 함수: 장르별 영화 목록
export function getMoviesByGenre(genre) {
  return movies.filter((movie) => movie.genre === genre)
}
