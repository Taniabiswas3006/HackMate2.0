function Loader({ text = 'Loading...' }) {
  return (
    <div className="flex items-center gap-3 text-sm text-body">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
      <span>{text}</span>
    </div>
  )
}

export default Loader
