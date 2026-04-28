import './ProductDetailModal.css'

export default function ProductDetailModal({ item, onClose }) {
  if (!item) return null

  return (
    <div className="pdm-overlay" onClick={onClose}>
      <div className="pdm-sheet" onClick={e => e.stopPropagation()}>

        {/* Cover image */}
        <div className="pdm-cover">
          <img src={item.img} alt={item.heading} className="pdm-cover-img" />
          <div className="pdm-cover-overlay" />
          <button className="pdm-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="pdm-body">
          <h2 className="pdm-heading">{item.heading}</h2>
          <p className="pdm-intro">{item.intro}</p>

          {/* Highlights grid */}
          {item.highlights && (
            <div className="pdm-highlights">
              {item.highlights.map((h, i) => (
                <div key={i} className="pdm-highlight-item">
                  <span className="pdm-highlight-icon">{h.icon}</span>
                  <span className="pdm-highlight-value">{h.value}</span>
                  <span className="pdm-highlight-label">{h.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Sections */}
          {item.sections && item.sections.map((sec, i) => (
            <div key={i} className="pdm-section">
              <h3 className="pdm-section-title">{sec.title}</h3>
              {sec.items && (
                <ul className="pdm-feature-list">
                  {sec.items.map((f, j) => (
                    <li key={j} className="pdm-feature-item">
                      <span className="pdm-feature-dot" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              )}
              {sec.text && <p className="pdm-section-text">{sec.text}</p>}
            </div>
          ))}

          {/* Spacer for fixed button */}
          <div style={{ height: '80px' }} />
        </div>

        {/* Fixed action button */}
        <div className="pdm-action-bar">
          <button className="pdm-action-btn">{item.action}</button>
        </div>
      </div>
    </div>
  )
}
