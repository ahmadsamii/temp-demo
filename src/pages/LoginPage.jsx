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

      <div className="login-top">
        <img src={`${import.meta.env.BASE_URL}EmiratesNBD-Logo.jpg`} alt="Emirates NBD" className="login-logo" />
      </div>

      <div className="login-bottom">
        <button className="uae-pass-btn" onClick={handleUAEPass}>
          <div className="uae-pass-icon">
            <img src={`${import.meta.env.BASE_URL}uae-pass.png`} alt="" />
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
