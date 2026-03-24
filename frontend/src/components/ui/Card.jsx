function Card({ title, subtitle, children, className = '' }) {
  return (
    <div
      className={`rounded-2xl border border-primary/10 bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft-lg ${className}`}
    >
      {title && <h3 className="text-base font-semibold text-heading">{title}</h3>}
      {subtitle && <p className="mt-1 text-sm text-body">{subtitle}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  )
}

export default Card
