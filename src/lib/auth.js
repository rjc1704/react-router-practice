// ============================================================
// 🧪 가짜 로그인 유틸 (실습 전용)
// ------------------------------------------------------------
// ⚠️ 이것은 실습용 더미 구현입니다.
//   - 실제 서비스에서는 서버가 발급한 JWT/세션 쿠키를 사용해야 합니다.
//   - localStorage의 boolean은 브라우저 콘솔 한 줄로 쉽게 조작되므로
//     절대 프로덕션 인증으로 사용하지 마세요.
//
// 이 실습의 목표는 "라우팅 제어(Protected Route) 패턴"을 익히는 것이고
// 인증 자체는 핵심이 아니므로, 가장 단순한 표현을 선택했습니다.
// ============================================================

const KEY = 'cinelog:isLoggedIn'

export function isLoggedIn() {
  return localStorage.getItem(KEY) === 'true'
}

export function login() {
  localStorage.setItem(KEY, 'true')
}

export function logout() {
  localStorage.removeItem(KEY)
}
