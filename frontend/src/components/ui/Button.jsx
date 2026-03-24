function Button({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  ...props
}) {
  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary-hover shadow-soft hover:shadow-soft-lg focus-visible:ring-primary/40',
    secondary:
      'bg-white text-primary border border-primary/20 hover:bg-primary/5 focus-visible:ring-primary/30',
    ghost:
      'bg-transparent text-primary hover:bg-primary/5 focus-visible:ring-primary/30',
  }

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
