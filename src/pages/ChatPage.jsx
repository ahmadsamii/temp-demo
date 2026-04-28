import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header'
import './ChatPage.css'

const REPLIES = {
  default: [
    "I understand your concern. Let me help you with that right away.",
    "I've noted your request. Our team will process this as a priority.",
    "Thank you for reaching out to Emirates NBD. How can I assist you further?",
  ],
  cardLost: "I'm sorry to hear that. I can see your Visa Platinum card ending in 4521 is active. Would you like me to block it immediately to prevent any unauthorized transactions?",
  cardBlocked: "Done! Your card ending in 4521 has been blocked. A service request has been raised:\n\n• SR# 100983689287\n• Category: Card Replacement\n• Status: In Progress\n• ETA: 5–7 business days\n\nA replacement card will be delivered to your registered address. Is there anything else I can help you with?",
  cardNotBlocked: "Understood. Your card remains active. Please monitor your transactions closely and contact us immediately if you notice anything suspicious. Stay safe!",
  balance: [
    "I can help you with balance conversion. Your current eligible balance is AED 12,450. Would you like to convert it to 6, 12, or 24 equal installments?",
    "Balance conversion is available! Our current rate for 12 months is 0.99% per month with no processing fee.",
  ],
  loan: [
    "Your loan application (SR# 100989899786) has been approved! AED 50,000 will reflect in your account within 24 hours.",
    "Your loan application is in progress. Our underwriting team is reviewing your documents and will update you by tomorrow.",
  ],
  transfer: [
    "I can initiate a funds transfer for you. Please confirm the beneficiary account details and the amount you'd like to transfer.",
    "Your transfer request has been received. International transfers typically take 1–2 business days.",
  ],
  statement: [
    "Your account statement for the past 6 months is ready. I've sent a PDF copy to your registered email address (a***@gmail.com).",
  ],
}

function isCardTopic(msg) {
  return msg.includes('card') || msg.includes('lost') || msg.includes('stolen') || msg.includes('missing')
}
function isYes(msg) {
  return msg.includes('yes') || msg.includes('yeah') || msg.includes('yep') || msg.includes('sure') || msg.includes('ok') || msg.includes('please') || msg.includes('block')
}
function isNo(msg) {
  return msg.includes('no') || msg.includes('nope') || msg.includes('don\'t') || msg.includes('dont') || msg.includes('cancel')
}

function formatTime(date) {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

const AGENT = { name: 'Sarah', title: 'ENBD Customer Support' }

export default function ChatPage() {
  const location = useLocation()
  const initialMessage = location.state?.initialMessage || ''
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [agentStatus, setAgentStatus] = useState('connecting')
  const bottomRef = useRef(null)
  const initialized = useRef(false)
  // tracks multi-turn context: null | 'awaiting_block_confirm'
  const conversationCtx = useRef(null)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const now = new Date()
    const msgs = []
    if (initialMessage) {
      msgs.push({ id: 1, role: 'user', text: initialMessage, time: formatTime(now) })
    }
    msgs.push({ id: 2, role: 'system', text: 'Connecting you to an agent...', time: formatTime(now) })
    setMessages(msgs)

    // Agent connects
    setTimeout(() => {
      setAgentStatus('connected')
      setMessages(prev => [
        ...prev,
        { id: 3, role: 'system', text: `${AGENT.name} from ${AGENT.title} has joined the chat`, time: formatTime(new Date()) },
      ])

      // Agent greeting
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: 4,
            role: 'agent',
            text: `Hello! I'm ${AGENT.name} from ${AGENT.title}. How can I assist you today?`,
            time: formatTime(new Date()),
          },
        ])

        // Auto-reply to initial message
        if (initialMessage) {
          setTimeout(() => {
            setTyping(true)
            setTimeout(() => {
              setTyping(false)
              const msg = initialMessage.toLowerCase()
              let reply
              if (isCardTopic(msg)) {
                conversationCtx.current = 'awaiting_block_confirm'
                reply = REPLIES.cardLost
              } else {
                const bucket = msg.includes('balance') || msg.includes('convert') ? REPLIES.balance
                  : msg.includes('loan') ? REPLIES.loan
                  : msg.includes('transfer') ? REPLIES.transfer
                  : msg.includes('statement') ? REPLIES.statement
                  : REPLIES.default
                reply = Array.isArray(bucket) ? bucket[0] : bucket
              }
              setMessages(prev => [
                ...prev,
                { id: Date.now(), role: 'agent', text: reply, time: formatTime(new Date()) },
              ])
            }, 1600)
          }, 900)
        }
      }, 800)
    }, 1800)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  function sendMessage(e) {
    e.preventDefault()
    if (!input.trim()) return
    const text = input.trim()
    const msg = text.toLowerCase()
    setInput('')
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text, time: formatTime(new Date()) }])
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      let reply

      if (conversationCtx.current === 'awaiting_block_confirm') {
        if (isYes(msg)) {
          conversationCtx.current = null
          reply = REPLIES.cardBlocked
        } else if (isNo(msg)) {
          conversationCtx.current = null
          reply = REPLIES.cardNotBlocked
        } else {
          reply = "Sorry, I didn't catch that. Would you like me to block your card ending in 4521? Please reply Yes or No."
        }
      } else if (isCardTopic(msg)) {
        conversationCtx.current = 'awaiting_block_confirm'
        reply = REPLIES.cardLost
      } else {
        const bucket = msg.includes('balance') || msg.includes('convert') ? REPLIES.balance
          : msg.includes('loan') ? REPLIES.loan
          : msg.includes('transfer') ? REPLIES.transfer
          : msg.includes('statement') ? REPLIES.statement
          : REPLIES.default
        reply = Array.isArray(bucket) ? bucket[Math.floor(Math.random() * bucket.length)] : bucket
      }

      setMessages(prev => [...prev, { id: Date.now(), role: 'agent', text: reply, time: formatTime(new Date()) }])
    }, 1200 + Math.random() * 600)
  }

  const chatHeader = (
    agentStatus === 'connecting' ? (
      <>
        <span className="header-center-name">Chat with Agent</span>
        <span className="header-center-status header-center-status--connecting">
          <span className="header-status-pulse" />
          Connecting...
        </span>
      </>
    ) : (
      <>
        <span className="header-center-name">{AGENT.name} — {AGENT.title}</span>
        <span className="header-center-status header-center-status--online">
          <span className="header-status-dot" />
          Online
        </span>
      </>
    )
  )

  return (
    <>
      <Header showBack={true} chatHeader={chatHeader} />
      <div className="page-content chat-content">
        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`chat-msg chat-msg--${msg.role}`}>
              {msg.role === 'system' ? (
                <p className="chat-msg-system">{msg.text}</p>
              ) : (
                <>
                  <div className="chat-bubble">{msg.text}</div>
                  <span className="chat-time">{msg.time}</span>
                </>
              )}
            </div>
          ))}
          {typing && (
            <div className="chat-msg chat-msg--agent">
              <div className="chat-bubble chat-bubble--typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <div style={{ height: '88px' }} />
      </div>

      <div className="chat-input-bar">
        <form className="chat-input-form" onSubmit={sendMessage}>
          <input
            className="chat-input-field"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            autoFocus
          />
          <button type="submit" className="chat-input-send" disabled={!input.trim()}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>
    </>
  )
}
