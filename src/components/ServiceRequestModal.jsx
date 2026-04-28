import './ServiceRequestModal.css'

const timelineSteps = [
  { label: 'Submitted', date: '23 Apr, 2026', done: true },
  { label: 'In Review', date: '23 Apr, 2026', done: true },
  { label: 'Processing', date: '24 Apr, 2026', done: true },
  { label: 'Pending', date: 'TBD', done: false },
]

const badgeClass = {
  'In Progress': 'badge badge--progress',
  'Closed': 'badge badge--closed',
  'Completed': 'badge badge--complete',
}

export default function ServiceRequestModal({ request, onClose }) {
  if (!request) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h2 className="modal-title">Service Request Details</h2>

        <div className="modal-meta-grid">
          <div className="modal-meta-item">
            <span className="modal-meta-label">SR NUMBER</span>
            <span className="modal-meta-value">{request.srNumber}</span>
          </div>
          <div className="modal-meta-item">
            <span className="modal-meta-label">STATUS</span>
            <span className={badgeClass[request.status] || 'badge'}>{request.status}</span>
          </div>
          <div className="modal-meta-item">
            <span className="modal-meta-label">CATEGORY</span>
            <span className="modal-meta-value">{request.category}</span>
          </div>
          <div className="modal-meta-item">
            <span className="modal-meta-label">SUBCATEGORY</span>
            <span className="modal-meta-value">{request.subcategory}</span>
          </div>
          <div className="modal-meta-item">
            <span className="modal-meta-label">SUBMITTED</span>
            <span className="modal-meta-value">{request.submitted}</span>
          </div>
          <div className="modal-meta-item">
            <span className="modal-meta-label">DUE DATE</span>
            <span className="modal-meta-value">{request.dueDate}</span>
          </div>
        </div>

        <div className="modal-desc-block">
          <h3 className="modal-desc-title">{request.title}</h3>
          <p className="modal-desc-body">{request.description}</p>
        </div>

        <div className="modal-timeline">
          <h3 className="modal-timeline-heading">Status Timeline</h3>
          <div className="timeline">
            {timelineSteps.map((step, i) => (
              <div key={i} className={`timeline-step ${step.done ? 'done' : 'pending'}`}>
                <div className="timeline-dot" />
                {i < timelineSteps.length - 1 && <div className="timeline-line" />}
                <div className="timeline-info">
                  <span className="timeline-label">{step.label}</span>
                  <span className="timeline-date">{step.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
