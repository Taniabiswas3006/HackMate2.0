export function getStatusClass(status) {
  if (status === 'Completed') return 'text-emerald-700'
  if (status === 'In Progress') return 'text-primary'
  return 'text-body'
}
