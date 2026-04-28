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

        <div className="login-card">
          <h1 className="login-welcome">Welcome back</h1>
          <p className="login-sub">Sign in to access your account</p>

          <button className="uae-pass-btn" onClick={handleUAEPass}>
            <div className="uae-pass-icon">
              <svg viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="#00A850"/>
                <path d="M12 20.5C12 15.81 15.81 12 20.5 12C25.19 12 29 15.81 29 20.5C29 25.19 25.19 29 20.5 29" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
                <path d="M17 20.5C17 18.567 18.567 17 20.5 17C22.433 17 24 18.567 24 20.5" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
                <circle cx="20.5" cy="20.5" r="2" fill="white"/>
                <path d="M12 23L15 26L12 29" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span>Login with UAE Pass</span>
            <svg className="uae-pass-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <p className="login-hint">Secure authentication via UAE digital identity</p>
        </div>

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
