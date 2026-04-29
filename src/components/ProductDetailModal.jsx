import { useState, useEffect, useRef } from 'react'
import './ProductDetailModal.css'

/* ── Card Finder Widget ─────────────────────────────────────────── */

const SALARY_OPTIONS = [
  'AED 5K – AED 9,999',
  'AED 10K – AED 19,999',
  'AED 20K – AED 29,999',
  'AED 30K – AED 39,999',
  'AED 40K – AED 49,999',
  'AED 50K or above',
]

const INTERESTS = ['Travel', 'Lifestyle', 'Cashback', 'Fuel', 'Shopping', 'Free for Life']

const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
]

function calcCardCount(salaryIdx, interests) {
  const salaryScore = salaryIdx < 2 ? 0 : salaryIdx < 4 ? 1 : 2
  const interestScore = interests.length <= 2 ? 0 : 1
  return Math.min(Math.max(2 + salaryScore + interestScore, 2), 5)
}

function getCallbackDates() {
  const today = new Date()
  return [1, 2].map(offset => {
    const d = new Date(today)
    d.setDate(today.getDate() + offset)
    return d
  })
}

function formatDateShort(d) {
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
}

function formatDateFull(d) {
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
}

function CardFinderWidget() {
  const [step, setStep] = useState('form') // 'form' | 'processing' | 'results' | 'confirmed'
  const [salary, setSalary] = useState('')
  const [salaryIdx, setSalaryIdx] = useState(-1)
  const [interests, setInterests] = useState([])
  const [cardCount, setCardCount] = useState(0)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState('')
  const callbackRef = useRef(null)

  useEffect(() => {
    if (step === 'results' && callbackRef.current) {
      setTimeout(() => {
        callbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 80)
    }
  }, [step])

  const callbackDates = getCallbackDates()
  const canSubmit = salary !== '' && interests.length > 0
  const canSchedule = selectedDate !== null && selectedTime !== ''

  function toggleInterest(name) {
    setInterests(prev =>
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    )
  }

  function handleFindCards() {
    if (!canSubmit) return
    const count = calcCardCount(salaryIdx, interests)
    setCardCount(count)
    setStep('processing')
    const duration = 2000 + Math.random() * 1000
    setTimeout(() => setStep('results'), duration)
  }

  function handleSchedule() {
    if (!canSchedule) return
    setStep('confirmed')
  }

  /* ── FORM ── */
  if (step === 'form') {
    return (
      <div className="cfw">
        <div className="cfw-field">
          <label className="cfw-label">Monthly Salary</label>
          <div className="cfw-select-wrap">
            <select
              className="cfw-select"
              value={salary}
              onChange={e => {
                const label = e.target.value
                setSalary(label)
                setSalaryIdx(SALARY_OPTIONS.indexOf(label))
              }}
            >
              <option value="">Select salary range</option>
              {SALARY_OPTIONS.map(o => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <span className="cfw-select-arrow" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 6 8 10 12 6" />
              </svg>
            </span>
          </div>
        </div>

        <div className="cfw-field">
          <label className="cfw-label">Your Interests</label>
          <div className="cfw-chips">
            {INTERESTS.map(name => (
              <button
                key={name}
                type="button"
                className={`cfw-chip${interests.includes(name) ? ' cfw-chip--active' : ''}`}
                onClick={() => toggleInterest(name)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <button
          className={`cfw-submit${canSubmit ? '' : ' cfw-submit--disabled'}`}
          onClick={handleFindCards}
          disabled={!canSubmit}
        >
          Find My Cards
        </button>
      </div>
    )
  }

  /* ── PROCESSING ── */
  if (step === 'processing') {
    return (
      <div className="cfw">
        <ProfileSummary salary={salary} interests={interests} />
        <div className="cfw-processing">
          <div className="cfw-spinner" />
          <span className="cfw-processing-text">Matching cards to your profile…</span>
        </div>
      </div>
    )
  }

  /* ── RESULTS + CALLBACK ── */
  if (step === 'results') {
    return (
      <div className="cfw">
        <ProfileSummary salary={salary} interests={interests} />

        <div className="cfw-match">
          <span className="cfw-match-count">{cardCount}</span>
          <div className="cfw-match-text">
            <span className="cfw-match-headline">eligible cards</span>
            <span className="cfw-match-sub">matched your profile</span>
          </div>
        </div>

        <div className="cfw-callback" ref={callbackRef}>
          <div className="cfw-callback-header">Schedule a Callback</div>
          <p className="cfw-callback-desc">
            Our credit card specialist will get in touch with you to assist with card selection,
            the application process, and any queries — at your preferred time.
          </p>

          <div className="cfw-field">
            <label className="cfw-label">Preferred Date</label>
            <div className="cfw-date-row">
              {callbackDates.map((d, i) => (
                <button
                  key={i}
                  type="button"
                  className={`cfw-option${selectedDate && selectedDate.toDateString() === d.toDateString() ? ' cfw-option--active' : ''}`}
                  onClick={() => setSelectedDate(d)}
                >
                  {formatDateShort(d)}
                </button>
              ))}
            </div>
          </div>

          <div className="cfw-field">
            <label className="cfw-label">Preferred Time</label>
            <div className="cfw-time-grid">
              {TIME_SLOTS.map(t => (
                <button
                  key={t}
                  type="button"
                  className={`cfw-option${selectedTime === t ? ' cfw-option--active' : ''}`}
                  onClick={() => setSelectedTime(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            className={`cfw-submit${canSchedule ? '' : ' cfw-submit--disabled'}`}
            onClick={handleSchedule}
            disabled={!canSchedule}
          >
            Schedule Callback
          </button>
        </div>
      </div>
    )
  }

  /* ── CONFIRMED ── */
  if (step === 'confirmed') {
    return (
      <div className="cfw cfw--confirmed">
        <div className="cfw-confirmed-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="cfw-confirmed-title">Request Received</h3>
        <p className="cfw-confirmed-body">
          Your interest has been recorded. Our credit card specialist will contact you on{' '}
          <strong>{formatDateFull(selectedDate)}</strong> at <strong>{selectedTime}</strong>.
        </p>
        <p className="cfw-confirmed-note">
          Please keep your Emirates ID ready when our specialist calls.
        </p>
      </div>
    )
  }

  return null
}

function ProfileSummary({ salary, interests }) {
  return (
    <div className="cfw-profile">
      <div className="cfw-profile-row">
        <span className="cfw-profile-label">Monthly Salary</span>
        <span className="cfw-profile-value">{salary}</span>
      </div>
      <div className="cfw-profile-row">
        <span className="cfw-profile-label">Interests</span>
        <span className="cfw-profile-value">{interests.join(', ')}</span>
      </div>
    </div>
  )
}

/* ── Main Modal ─────────────────────────────────────────────────── */

export default function ProductDetailModal({ item, onClose }) {
  if (!item) return null

  return (
    <div className="pdm-overlay" onClick={onClose}>
      <div className="pdm-sheet" onClick={e => e.stopPropagation()}>

        <div className="pdm-cover">
          <img src={item.img} alt={item.heading} className="pdm-cover-img" />
          <div className="pdm-cover-overlay" />
          <button className="pdm-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="pdm-body">
          <h2 className="pdm-heading">{item.heading}</h2>
          <p className="pdm-intro">{item.intro}</p>

          {item.isCreditCard ? (
            <CardFinderWidget />
          ) : (
            <>
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

              <div style={{ height: '80px' }} />
            </>
          )}

          {item.isCreditCard && <div style={{ height: '28px' }} />}
        </div>

        {!item.isCreditCard && (
          <div className="pdm-action-bar">
            <button className="pdm-action-btn">{item.action}</button>
          </div>
        )}
      </div>
    </div>
  )
}
