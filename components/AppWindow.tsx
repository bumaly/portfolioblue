type Props = {
  title: string
  children: React.ReactNode
  statusLeft?: string
  statusRight?: string
  className?: string
}

export default function AppWindow({ title, children, statusLeft, statusRight, className }: Props) {
  return (
    <div className={`app-window ${className || ''}`}>
      <div className="window-titlebar">
        <div className="window-title-left">
          <span className="window-icon">📄</span>
          <span className="window-title-text">{title}</span>
        </div>
        <div className="window-controls">
          <button className="win-btn" aria-label="Minimize">_</button>
          <button className="win-btn" aria-label="Maximize">□</button>
          <button className="win-btn win-btn-close" aria-label="Close">✕</button>
        </div>
      </div>
<div className="window-body">
        {children}
      </div>
      {(statusLeft || statusRight) && (
        <div className="window-statusbar">
          <div className="status-cell">{statusLeft || ''}</div>
          {statusRight && <div className="status-cell" style={{ marginLeft: 'auto' }}>{statusRight}</div>}
        </div>
      )}
    </div>
  )
}
