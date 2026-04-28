import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import ServiceRequestModal from '../components/ServiceRequestModal'
import './HomePage.css'

const PRODUCTS = [
  { id: 1, name: 'Premium Credit Cards', img: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&h=400&fit=crop' },
  { id: 2, name: 'Investment Funds', img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=400&fit=crop' },
  { id: 3, name: 'Easy Home Loans', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=400&fit=crop' },
  { id: 4, name: 'Dream Car Loans', img: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=400&fit=crop' },
  { id: 5, name: 'Fixed Deposits', img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=400&fit=crop' },
]

const RECOMMENDED = [
  { id: 1, name: 'Balance Conversion', desc: 'Convert your balance to easy installments', img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=300&fit=crop' },
  { id: 2, name: 'Bill Payments', desc: 'Pay all your bills in one place', img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=300&fit=crop' },
  { id: 3, name: 'Funds Transfer', desc: 'Send money locally & internationally', img: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=600&h=300&fit=crop' },
  { id: 4, name: 'Installment Plans', desc: 'Split purchases into easy payments', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=300&fit=crop' },
]

const SERVICE_REQUESTS = [
  {
    id: 1,
    title: 'Card Replacement Request',
    srNumber: '100983689286',
    category: 'Card Services',
    subcategory: 'Card Replacement',
    status: 'In Progress',
    submitted: '23 Apr, 2026',
    dueDate: '30 Apr, 2026',
    description: 'Request to replace lost/stolen credit card with a new card. The replacement card will be delivered to the registered address within 5-7 business days.',
  },
  {
    id: 2,
    title: 'Account Statement Request',
    srNumber: '100982578366',
    category: 'Account Services',
    subcategory: 'Statement',
    status: 'Closed',
    submitted: '23 Apr, 2026',
    dueDate: '25 Apr, 2026',
    description: 'Request for account statement for the past 6 months for visa application purposes.',
  },
  {
    id: 3,
    title: 'Loan Application',
    srNumber: '100989899786',
    category: 'Lending',
    subcategory: 'Personal Loan',
    status: 'Completed',
    submitted: '23 Apr, 2026',
    dueDate: '28 Apr, 2026',
    description: 'Personal loan application for home renovation. The application has been approved and disbursement is in process.',
  },
]

const statusClass = { 'In Progress': 'badge--progress', 'Closed': 'badge--closed', 'Completed': 'badge--complete' }

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function HomePage() {
  const navigate = useNavigate()
  const [chatInput, setChatInput] = useState('My card is lost')
  const [selectedSR, setSelectedSR] = useState(null)

  function handleChatSubmit(e) {
    e.preventDefault()
    if (chatInput.trim()) {
      navigate('/chat', { state: { initialMessage: chatInput.trim() } })
    }
  }

  return (
    <>
      <Header showBack={false} />
      <div className="page-content home-content">

        {/* Greeting */}
        <div className="home-greeting">
          <p className="home-greeting-sub">{getGreeting()}</p>
          <h2 className="home-greeting-name">Ahmed Al Mansoori</h2>
        </div>

        {/* Explore Products */}
        <section className="home-section">
          <div className="home-section-header">
            <span className="section-title">Explore ENBD Products</span>
          </div>
          <div className="h-scroll products-scroll">
            {PRODUCTS.map(p => (
              <div key={p.id} className="story-card">
                <img src={p.img} alt={p.name} className="story-card-img" loading="lazy" />
                <div className="story-card-overlay" />
                <span className="story-card-label">{p.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended */}
        <section className="home-section">
          <div className="home-section-header">
            <span className="section-title">Recommended for you</span>
          </div>
          <div className="h-scroll reco-scroll">
            {RECOMMENDED.map(r => (
              <div key={r.id} className="reco-card">
                <img src={r.img} alt={r.name} className="reco-card-img" loading="lazy" />
                <div className="reco-card-overlay" />
                <div className="reco-card-body">
                  <span className="reco-card-name">{r.name}</span>
                  <span className="reco-card-desc">{r.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Service Requests */}
        <section className="home-section home-section--last">
          <div className="home-section-header">
            <span className="section-title">Recent Service Requests</span>
          </div>
          <div className="sr-list">
            {SERVICE_REQUESTS.map(sr => (
              <button key={sr.id} className="sr-item" onClick={() => setSelectedSR(sr)}>
                <div className="sr-item-left">
                  <span className="sr-item-title">{sr.title}</span>
                  <span className="sr-item-meta">SR# {sr.srNumber} · {sr.submitted}</span>
                </div>
                <span className={`badge ${statusClass[sr.status]}`}>{sr.status}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Spacer for sticky footer */}
        <div style={{ height: '100px' }} />
      </div>

      {/* Sticky Chat Footer */}
      <div className="chat-footer">
        <p className="chat-footer-label">Chat with Agent</p>
        <form className="chat-footer-form" onSubmit={handleChatSubmit}>
          <input
            className="chat-footer-input"
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            placeholder="Ask me anything..."
          />
          <button type="submit" className="chat-footer-send">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>

      {selectedSR && (
        <ServiceRequestModal request={selectedSR} onClose={() => setSelectedSR(null)} />
      )}
    </>
  )
}
