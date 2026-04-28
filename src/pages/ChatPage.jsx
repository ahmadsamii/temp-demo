import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header'
import './ChatPage.css'

const BOT_REPLIES = {
  default: [
    "I understand your concern. Let me help you with that right away.",
    "I've noted your request. Our team will process this as a priority.",
    "Thank you for reaching out to Emirates NBD. How can I assist you further?",
  ],
  card: [
    "I'm sorry to hear about your lost card. I've immediately blocked your card for security. A replacement will be couriered to your registered address within 5-7 business days. SR# 100983689287 has been created.",
    "Your card has been blocked to prevent unauthorized transactions. Would you like to set up a temporary virtual card while you wait for the replacement?",
  ],
  balance: [
    "I can help you with balance conversion. Your current eligible balance for conversion is AED 12,450. Would you like to convert it to 6, 12, or 24 equal installments?",
    "Balance conversion is a great option! Our current rate for 12 months is 0.99% per month with no processing fee.",
  ],
  loan: [
    "Your loan application (SR# 100989899786) has been approved! The disbursement of AED 50,000 will reflect in your account within 24 hours.",
    "I can see your loan application is in progress. Our underwriting team is reviewing your documents and will update you by tomorrow.",
  ],
  transfer: [
    "I can initiate a funds transfer for you. Please confirm the beneficiary account details and the amount you'd like to transfer.",
    "Your transfer request has been received. International transfers typically take 1-2 business days.",
  ],
  statement: [
    "Your account statement for the past 6 months is ready. I've sent a PDF copy to your registered email address (a***@gmail.com).",
  ],
}

function getBotReply(message) {
  const msg = message.toLowerCase()
  if (msg.includes('card') || msg.includes('lost') || msg.includes('block')) return BOT_REPLIES.card
  if (msg.includes('balance') || msg.includes('convert') || msg.includes('installment')) return BOT_REPLIES.balance
  if (msg.includes('loan')) return BOT_REPLIES.loan
  if (msg.includes('transfer') || msg.includes('send money')) return BOT_REPLIES.transfer
  if (msg.includes('statement')) return BOT_REPLIES.statement
  return BOT_REPLIES.default
}

function formatTime(date) {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

export default function ChatPage() {
  const location = useLocation()
  const initialMessage = location.state?.initialMessage || ''
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const now = new Date()
    const msgs = []

    if (initialMessage) {
      msgs.push({ id: 1, role: 'user', text: initialMessage, time: formatTime(now) })
    }

    msgs.push({
      id: 2,
      role: 'system',
      text: 'Connecting you to an agent...',
      time: formatTime(now),
    })

    setMessages(msgs)

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: 3,
          role: 'agent',
          text: "Hello! I'm Sarah from ENBD Customer Support. How can I assist you today?",
          time: formatTime(new Date()),
        },
      ])

      if (initialMessage) {
        setTimeout(() => {
          setTyping(true)
          setTimeout(() => {
            const replies = getBotReply(initialMessage)
            const reply = replies[0]
            setTyping(false)
            setMessages(prev => [
              ...prev,
              { id: Date.now(), role: 'agent', text: reply, time: formatTime(new Date()) },
            ])
          }, 1500)
        }, 800)
      }
    }, 1200)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  function sendMessage(e) {
    e.preventDefault()
    if (!input.trim()) return

    const text = input.trim()
    setInput('')
    const userMsg = { id: Date.now(), role: 'user', text, time: formatTime(new Date()) }
    setMessages(prev => [...prev, userMsg])

    setTyping(true)
    setTimeout(() => {
      const replies = getBotReply(text)
      const reply = replies[Math.floor(Math.random() * replies.length)]
      setTyping(false)
      setMessages(prev => [
        ...prev,
        { id: Date.now(), role: 'agent', text: reply, time: formatTime(new Date()) },
      ])
    }, 1200 + Math.random() * 600)
  }

  return (
    <>
      <Header showBack={true} />
      <div className="page-content chat-content">
        <div className="chat-agent-bar">
          <div className="chat-agent-avatar">S</div>
          <div className="chat-agent-info">
            <span className="chat-agent-name">Sarah — ENBD Support</span>
            <span className="chat-agent-status">
              <span className="chat-agent-dot" />
              Online
            </span>
          </div>
        </div>

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

      {/* Sticky input */}
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
