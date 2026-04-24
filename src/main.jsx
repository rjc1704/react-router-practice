import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// ============================================================
// 👋 실습#1 시작 위치
// ------------------------------------------------------------
// TODO 1: 'react-router-dom' 에서 BrowserRouter 를 import 하세요.
//         예: import { BrowserRouter } from 'react-router-dom'
//
// TODO 2: 아래 <App /> 을 <BrowserRouter>...</BrowserRouter> 로 감싸세요.
//         이렇게 해야 App 안의 어느 컴포넌트에서든 React Router 훅
//         (useNavigate, useParams 등)을 사용할 수 있습니다.
// ============================================================

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
