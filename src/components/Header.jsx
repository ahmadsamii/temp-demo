import { useNavigate } from 'react-router-dom'

export default function Header({ showBack = false }) {
  const navigate = useNavigate()

  return (
    <header className="app-header">
      <div className="header-left">
        {showBack ? (
          <button className="header-back" onClick={() => navigate(-1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>
        ) : (
          <div className="header-logo">
            <img src={`${import.meta.env.BASE_URL}enbd-logo-horizontal.jpg`} alt="Emirates NBD" />
          </div>
        )}
      </div>
      <button className="header-menu" aria-label="Menu">
        <span />
        <span />
        <span />
      </button>
    </header>
  )
}
