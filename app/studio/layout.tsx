export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'auto' }}>
      {children}
    </div>
  )
}
