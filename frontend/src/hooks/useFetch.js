import { useEffect, useState } from 'react'

function useFetch(fetcher) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true

    const run = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetcher()
        if (active) {
          setData(response)
        }
      } catch (err) {
        if (active) {
          setError(err)
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    run()

    return () => {
      active = false
    }
  }, [fetcher])

  return { data, loading, error }
}

export default useFetch
