import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import ServiceRequestModal from '../components/ServiceRequestModal'
import ProductDetailModal from '../components/ProductDetailModal'
import './HomePage.css'

const PRODUCTS = [
  {
    id: 1, name: 'Premium Credit Cards',
    img: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&h=400&fit=crop',
    heading: 'Emirates NBD Signature Visa Platinum Card',
    intro: 'Experience the pinnacle of banking privileges with our Signature Visa Platinum Card — designed for those who expect more from every purchase.',
    action: 'Apply Now',
    highlights: [
      { icon: '💳', label: 'Annual Fee', value: 'AED 0*' },
      { icon: '💰', label: 'Cash Back', value: 'Up to 5%' },
      { icon: '✈️', label: 'Lounge Access', value: '8 visits/yr' },
      { icon: '🏦', label: 'Credit Limit', value: 'Up to AED 150K' },
    ],
    sections: [
      {
        title: 'Key Benefits',
        items: [
          '5% cashback on dining & entertainment worldwide',
          '2% cashback on all other local & international spends',
          'Complimentary travel insurance up to AED 750,000',
          'Airport lounge access at 1,000+ lounges globally',
          '0% Easy Payment Plan on purchases over AED 500',
        ],
      },
      {
        title: 'Eligibility',
        items: [
          'Minimum monthly salary: AED 10,000',
          'UAE resident with valid Emirates ID',
          'Age 21–65 years',
        ],
      },
      { title: 'Terms & Conditions', text: '*Annual fee waived for the first year. Standard fee of AED 300 applies from year two. Cash back credited monthly. Lounge access subject to fair use policy.' },
    ],
  },
  {
    id: 2, name: 'Investment Funds',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=400&fit=crop',
    heading: 'Emirates NBD Diversified Investment Fund Portfolio',
    intro: 'Grow your wealth with our professionally managed investment funds, offering a diversified portfolio across global equities, sukuk, and real estate.',
    action: 'Invest Now',
    highlights: [
      { icon: '📈', label: 'Expected Return', value: '8–12% p.a.' },
      { icon: '💵', label: 'Min. Investment', value: 'AED 10,000' },
      { icon: '🔒', label: 'Lock-in Period', value: '12 months' },
      { icon: '⚖️', label: 'Risk Level', value: 'Medium' },
    ],
    sections: [
      {
        title: 'Fund Breakdown',
        items: [
          'Global Equities Fund — 40% allocation, avg. 10.2% annual return',
          'UAE Sukuk Fund — 30% allocation, avg. 6.5% annual return',
          'Real Estate Investment Trust — 20% allocation',
          'Money Market Fund — 10% allocation for liquidity',
        ],
      },
      {
        title: 'Features',
        items: [
          'Managed by Morningstar 5-star rated fund managers',
          'Quarterly dividend distributions',
          'Real-time portfolio tracking via ENBD app',
          'Shariah-compliant options available',
          'Auto-reinvestment plan available',
        ],
      },
      { title: 'Disclaimer', text: 'Past performance is not indicative of future results. Investments are subject to market risk. Please read all fund documents carefully before investing.' },
    ],
  },
  {
    id: 3, name: 'Easy Home Loans',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=400&fit=crop',
    heading: 'Emirates NBD Easy Home Finance — Own Your Dream Home',
    intro: 'Make your dream home a reality with flexible financing options, competitive rates, and fast approval — exclusively for UAE residents and nationals.',
    action: 'Apply Now',
    highlights: [
      { icon: '📉', label: 'Interest Rate', value: '3.49% p.a.' },
      { icon: '🏠', label: 'Max Finance', value: 'AED 15M' },
      { icon: '📅', label: 'Tenure', value: 'Up to 25 yrs' },
      { icon: '⚡', label: 'Approval', value: 'In 24 hrs' },
    ],
    sections: [
      {
        title: 'What We Offer',
        items: [
          'Finance up to 85% of property value for first-time buyers',
          'Both conventional and Islamic (Ijara) home finance',
          'Free property valuation service',
          'Option to defer first instalment by 90 days',
          'Balance transfer from other banks at 0% processing fee',
        ],
      },
      {
        title: 'Eligibility',
        items: [
          'UAE Nationals & Residents',
          'Minimum monthly salary: AED 15,000',
          'Property must be in UAE',
          'Age 21–65 at time of maturity',
        ],
      },
      { title: 'Note', text: 'Rate shown is indicative and subject to change based on credit assessment. A processing fee of 1% of the finance amount applies.' },
    ],
  },
  {
    id: 4, name: 'Dream Car Loans',
    img: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=400&fit=crop',
    heading: 'Emirates NBD Auto Finance — Drive Your Dream Car Today',
    intro: 'Get behind the wheel of your dream car with our fast and flexible auto finance. New, used, or electric — we finance all vehicle types.',
    action: 'Apply Now',
    highlights: [
      { icon: '🚗', label: 'Interest Rate', value: '2.49% p.a.' },
      { icon: '💵', label: 'Max Finance', value: 'AED 500K' },
      { icon: '📅', label: 'Tenure', value: 'Up to 5 yrs' },
      { icon: '📋', label: 'Down Payment', value: 'From 20%' },
    ],
    sections: [
      {
        title: 'Finance Options',
        items: [
          'New & pre-owned vehicles from registered dealers',
          'Electric Vehicle (EV) financing with 0.5% rate rebate',
          'Top-up finance available on existing loan after 12 months',
          'Free comprehensive insurance for first year',
          'Grace period of 60 days on first instalment',
        ],
      },
      {
        title: 'Eligibility',
        items: [
          'Minimum monthly salary: AED 8,000',
          'UAE resident with valid driving licence',
          'Vehicle age not more than 5 years (for used cars)',
        ],
      },
      { title: 'Note', text: 'Rate of 2.49% p.a. applies to new vehicles with 20% down payment. Used vehicles attract a rate of 3.25% p.a. Processing fee of AED 500 applies.' },
    ],
  },
  {
    id: 5, name: 'Fixed Deposits',
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=400&fit=crop',
    heading: 'Emirates NBD Fixed Deposit — Guaranteed Growth on Your Savings',
    intro: 'Secure your savings with guaranteed returns. Our fixed deposits offer competitive interest rates with flexible tenures in multiple currencies.',
    action: 'Open Account',
    highlights: [
      { icon: '💹', label: 'Interest Rate', value: 'Up to 5.25%' },
      { icon: '💵', label: 'Min. Deposit', value: 'AED 25,000' },
      { icon: '📅', label: 'Tenure', value: '1–60 months' },
      { icon: '🌍', label: 'Currencies', value: 'AED/USD/EUR' },
    ],
    sections: [
      {
        title: 'Rate Card',
        items: [
          '3 months — 4.50% p.a. (AED)',
          '6 months — 4.85% p.a. (AED)',
          '12 months — 5.25% p.a. (AED)',
          '24 months — 5.00% p.a. (AED)',
          'USD rates available from 4.75% p.a.',
        ],
      },
      {
        title: 'Features',
        items: [
          'Guaranteed returns — no market risk',
          'Interest paid monthly, quarterly, or at maturity',
          'Auto-renewal option with rate lock',
          'Premature withdrawal allowed with reduced rate',
          'Islamic Term Deposit (Wakala) available',
        ],
      },
      { title: 'Note', text: 'Rates are subject to change. Premature withdrawal will attract a 1% penalty on interest earned. Minimum deposit of AED 25,000 required.' },
    ],
  },
]

const RECOMMENDED = [
  {
    id: 1, name: 'Balance Conversion', desc: 'Convert your balance to easy installments',
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=300&fit=crop',
    heading: 'Balance Conversion — Turn Your Outstanding Balance into Easy Instalments',
    intro: 'Struggling with a large credit card balance? Convert it into manageable monthly instalments at a low flat rate — with zero processing fees.',
    action: 'Convert Now',
    highlights: [
      { icon: '📉', label: 'Monthly Rate', value: '0.99%' },
      { icon: '📅', label: 'Tenure Options', value: '6/12/24 mo' },
      { icon: '🎯', label: 'Processing Fee', value: 'AED 0' },
      { icon: '💳', label: 'Eligible Balance', value: 'AED 12,450' },
    ],
    sections: [
      {
        title: 'How It Works',
        items: [
          'Select the amount you wish to convert (min. AED 500)',
          'Choose your preferred tenure: 6, 12, or 24 months',
          'Monthly instalment is calculated at 0.99% flat rate',
          'Instalment is added to your monthly credit card bill',
          'No impact on your remaining credit limit',
        ],
      },
      {
        title: 'Example Calculation',
        items: [
          'Convert AED 12,450 over 12 months',
          'Monthly instalment: AED 1,161.75',
          'Total repayment: AED 13,941',
          'Total interest: AED 1,491 (vs. minimum payment interest of ~AED 3,200)',
        ],
      },
      { title: 'Terms', text: 'Offer valid for eligible Emirates NBD credit cardholders. Minimum outstanding balance of AED 500 required. Cannot be combined with other promotions.' },
    ],
  },
  {
    id: 2, name: 'Bill Payments', desc: 'Pay all your bills in one place',
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=300&fit=crop',
    heading: 'Smart Bill Payments — Pay All Your Bills in One Place, Instantly',
    intro: 'Manage and pay all your utility, telecom, government, and subscription bills from a single screen. Fast, secure, and always on time.',
    action: 'Pay Bills Now',
    highlights: [
      { icon: '⚡', label: 'Processing', value: 'Instant' },
      { icon: '🏢', label: 'Billers', value: '200+' },
      { icon: '🔔', label: 'Auto-Pay', value: 'Available' },
      { icon: '💸', label: 'Fees', value: 'AED 0' },
    ],
    sections: [
      {
        title: 'Supported Categories',
        items: [
          'Utilities — DEWA, ADDC, SEWA, Etihad Water & Electricity',
          'Telecom — Etisalat (e&), du, Virgin Mobile',
          'Government — RTA, Dubai Municipality, ADNOC, Fine payments',
          'Entertainment — OSN, Shahid, Netflix via telco',
          'Insurance — ADNIC, Daman, AXA, Oman Insurance',
        ],
      },
      {
        title: 'Smart Features',
        items: [
          'Schedule payments up to 30 days in advance',
          'Auto-pay with customisable limits and alerts',
          'Bill history for up to 24 months',
          'Split bill payments across multiple accounts',
        ],
      },
    ],
  },
  {
    id: 3, name: 'Funds Transfer', desc: 'Send money locally & internationally',
    img: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=600&h=300&fit=crop',
    heading: 'Instant Funds Transfer — Send Money Locally & Internationally',
    intro: 'Transfer money securely to any bank in the UAE or abroad with real-time rates and competitive fees. Available 24/7, 365 days a year.',
    action: 'Transfer Now',
    highlights: [
      { icon: '⚡', label: 'Local Transfer', value: 'Instant' },
      { icon: '🌍', label: 'Countries', value: '120+' },
      { icon: '💱', label: 'Currencies', value: '40+' },
      { icon: '💸', label: 'Int\'l Fee', value: 'From AED 15' },
    ],
    sections: [
      {
        title: 'Transfer Types',
        items: [
          'UAEFTS (Local) — Instant to any UAE bank, 24/7, free',
          'SWIFT International — 120+ countries, 1–3 business days',
          'Western Union — Cash pickup in 200+ countries within minutes',
          'Own Account Transfer — Instant, always free',
          'Standing Orders — Auto recurring transfers on set dates',
        ],
      },
      {
        title: 'Exchange Rates',
        items: [
          'USD/AED: 3.6730 (Buy) | 3.6745 (Sell)',
          'EUR/AED: 4.0210 (Buy) | 4.0380 (Sell)',
          'GBP/AED: 4.6820 (Buy) | 4.7050 (Sell)',
          'INR/AED: 0.0435 (Buy) | 0.0440 (Sell)',
          'Rates updated every 30 minutes on business days',
        ],
      },
    ],
  },
  {
    id: 4, name: 'Installment Plans', desc: 'Split purchases into easy payments',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=300&fit=crop',
    heading: '0% Installment Plans — Shop Now, Pay Later at Your Pace',
    intro: 'Split your big purchases into 3 to 36 equal monthly instalments at 0% interest from 2,000+ partner merchants across UAE and online.',
    action: 'Explore Offers',
    highlights: [
      { icon: '🎯', label: 'Interest', value: '0%' },
      { icon: '🏪', label: 'Merchants', value: '2,000+' },
      { icon: '📅', label: 'Tenures', value: '3–36 mo' },
      { icon: '💵', label: 'Min. Amount', value: 'AED 500' },
    ],
    sections: [
      {
        title: 'Partner Categories',
        items: [
          'Electronics — Apple, Samsung, LG, Sony, Sharaf DG',
          'Fashion — Bloomingdale\'s, H&M, Zara, Brands for Less',
          'Travel — Emirates, Etihad, Air Arabia, Booking.com',
          'Healthcare — Aster, Mediclinic, American Hospital',
          'Furniture & Home — IKEA, HomeCentre, Pottery Barn',
        ],
      },
      {
        title: 'How to Activate',
        items: [
          'Shop at any participating merchant and pay with ENBD card',
          'Request instalment plan at point of sale or via ENBD app',
          'Select tenure: 3, 6, 12, 24, or 36 months',
          'Confirmation received via SMS instantly',
          'Monthly instalment auto-deducted from credit card',
        ],
      },
      { title: 'Terms', text: '0% rate applies to select merchants only. For other merchants, a processing fee of 1.05% per month applies. Minimum purchase amount of AED 500 required.' },
    ],
  },
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
  const [selectedProduct, setSelectedProduct] = useState(null)

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
              <div key={p.id} className="story-card" onClick={() => setSelectedProduct(p)}>
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
              <div key={r.id} className="reco-card" onClick={() => setSelectedProduct(r)}>
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
      {selectedProduct && (
        <ProductDetailModal item={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </>
  )
}
