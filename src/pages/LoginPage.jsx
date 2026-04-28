import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  function handleUAEPass() {
    setLoading(true)
    setTimeout(() => navigate('/home'), 2800)
  }

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="login-blob login-blob--1" />
        <div className="login-blob login-blob--2" />
      </div>

      <div className="login-body">
        <div className="login-logo-wrap">
          <img src={`${import.meta.env.BASE_URL}EmiratesNBD-Logo.jpg`} alt="Emirates NBD" className="login-logo" />
        </div>

        <button className="uae-pass-btn" onClick={handleUAEPass}>
          <div className="uae-pass-icon">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 8C27 8 8 27 8 50s19 42 42 42 42-19 42-42S73 8 50 8z" fill="none"/>
              <path d="M50 15c-10 0-19 4-25.5 10.5" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" fill="none"/>
              <path d="M24.5 74.5C31 81 40 85 50 85c19.3 0 35-15.7 35-35S69.3 15 50 15c-5.2 0-10.1 1.1-14.5 3.1" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" fill="none"/>
              <path d="M50 28c-3.7 0-7.1 1-10 2.8" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" fill="none"/>
              <path d="M40 30.8C35.8 33.7 33 38.5 33 44c0 9.4 7.6 17 17 17s17-7.6 17-17-7.6-17-17-17c-1.2 0-2.3.1-3.4.4" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" fill="none"/>
              <path d="M50 40c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" fill="#1a1a1a"/>
              <path d="M50 48v14" stroke="#009A44" strokeWidth="6" strokeLinecap="round"/>
              <path d="M44 55c-7.2-1.4-13-7.8-13-15.5 0-1.2.1-2.3.4-3.4" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" fill="none"/>
              <path d="M50 62v10" stroke="#EF3340" strokeWidth="6" strokeLinecap="round"/>
              <path d="M28 62c-1.8-3.2-2.8-6.9-2.8-10.8 0-2.3.3-4.5.9-6.6" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" fill="none"/>
              <path d="M20 44c-.6 2.3-1 4.7-1 7.2 0 5.4 1.5 10.4 4 14.8" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
          <span>Sign in with UAE PASS</span>
        </button>

        <p className="login-hint">Secure authentication via UAE digital identity</p>

        <p className="login-footer">© 2026 Emirates NBD. All rights reserved.</p>
      </div>

      {loading && (
        <div className="loading-overlay">
          <div className="loading-sheet">
            <div className="loading-spinner" />
            <p className="loading-text">Please wait while we authenticate with UAE Pass...</p>
          </div>
        </div>
      )}
    </div>
  )
}
