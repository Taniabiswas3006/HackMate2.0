import { useEffect, useState } from 'react'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'
import Loader from '../components/ui/Loader.jsx'
import { useAuth } from '../context/useAuth.js'
import { getAllBranchInterests } from '../services/interestService.js'

function Profile() {
  const { currentUser, updateProfile } = useAuth()

  // Dynamic branch → interests map from the backend
  const [branchInterestsMap, setBranchInterestsMap] = useState({})
  const [loadingInterests, setLoadingInterests] = useState(true)
  const [fetchError, setFetchError] = useState(null)
  const [saveMsg, setSaveMsg] = useState('')

  // Form state
  const [formValues, setFormValues] = useState(() => ({
    name: currentUser.name,
    branch: currentUser.department || currentUser.branch || '',
    year: String(currentUser.year).replace(/\D/g, '') || '2',
    interests: currentUser.interests || [],
  }))

  // Fetch all branches and their interests on mount
  useEffect(() => {
    let active = true
    setLoadingInterests(true)
    setFetchError(null)

    getAllBranchInterests()
      .then((data) => {
        if (active) {
          setBranchInterestsMap(data)
          // If the user's branch isn't set yet, auto-select the first branch
          if (!formValues.branch && Object.keys(data).length > 0) {
            setFormValues((prev) => ({ ...prev, branch: Object.keys(data)[0] }))
          }
        }
      })
      .catch((err) => {
        if (active) setFetchError(err.message || 'Failed to load interests')
      })
      .finally(() => {
        if (active) setLoadingInterests(false)
      })

    return () => { active = false }
  }, [])

  // When branch changes, reset selected interests (unless they still exist)
  const availableInterests = branchInterestsMap[formValues.branch] || []

  const handleChange = (event) => {
    const { name, value } = event.target
    if (name === 'branch') {
      // Reset interests when changing branch
      setFormValues((prev) => ({ ...prev, branch: value, interests: [] }))
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }))
    }
    setSaveMsg('')
  }

  const toggleInterest = (interest) => {
    setFormValues((prev) => {
      const current = prev.interests
      const updated = current.includes(interest)
        ? current.filter((i) => i !== interest)
        : [...current, interest]
      return { ...prev, interests: updated }
    })
    setSaveMsg('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (formValues.interests.length === 0) {
      setSaveMsg('Please select at least one interest.')
      return
    }
    const yearNum = parseInt(formValues.year, 10)
    const yearLabel = `${yearNum}${yearNum === 1 ? 'st' : yearNum === 2 ? 'nd' : yearNum === 3 ? 'rd' : 'th'} Year`

    try {
      await updateProfile({
        name: formValues.name,
        branch: formValues.branch,
        department: formValues.branch,
        year: yearLabel,
        interests: formValues.interests,
      })
      setSaveMsg('✅ Profile saved! Head to the Dashboard to see your personalised results.')
    } catch (err) {
      setSaveMsg(`❌ ${err.message || 'Error updating profile'}`)
    }
  }

  const inputClasses =
    'w-full rounded-xl border border-primary/20 bg-card px-4 py-2.5 text-sm text-heading outline-none transition-all duration-200 placeholder:text-body/50 focus:border-primary focus:ring-2 focus:ring-primary/15'

  const selectClasses =
    'w-full rounded-xl border border-primary/20 bg-card px-4 py-2.5 text-sm text-heading outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/15 appearance-none cursor-pointer'

  return (
    <div>
      <h1 className="text-2xl font-semibold text-heading sm:text-3xl">Profile</h1>
      <p className="mt-2 text-sm text-body">
        Keep your details updated for better recommendations.
      </p>

      {/* Profile Header */}
      <div className="mt-6 flex items-center gap-4 rounded-2xl border border-primary/10 bg-card p-5 shadow-soft">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-xl font-bold text-primary">
          {currentUser.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-heading">{currentUser.name}</h2>
          <p className="text-sm text-body">
            {currentUser.department || currentUser.branch} · {currentUser.year}
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {currentUser.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full bg-secondary/15 px-2.5 py-0.5 text-xs font-medium text-purple-600"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Card className="mt-6 max-w-xl" title="Edit Profile">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-heading"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>

          {/* Branch (dynamic from backend) */}
          <div>
            <label
              htmlFor="branch"
              className="mb-1.5 block text-sm font-medium text-heading"
            >
              Academic Branch
            </label>
            {loadingInterests ? (
              <Loader text="Loading branches..." />
            ) : fetchError ? (
              <p className="text-sm text-pink-700">{fetchError}</p>
            ) : (
              <select
                id="branch"
                name="branch"
                value={formValues.branch}
                onChange={handleChange}
                className={selectClasses}
                required
              >
                <option value="" disabled>Select your branch…</option>
                {Object.keys(branchInterestsMap).map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            )}
          </div>

          {/* Year */}
          <div>
            <label
              htmlFor="year"
              className="mb-1.5 block text-sm font-medium text-heading"
            >
              Year of Study
            </label>
            <select
              id="year"
              name="year"
              value={formValues.year}
              onChange={handleChange}
              className={selectClasses}
              required
            >
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>

          {/* Interests (dynamic pill selector) */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-heading">
              Your Interests{' '}
              <span className="text-xs font-normal text-body">(select at least one)</span>
            </label>

            {availableInterests.length === 0 && !loadingInterests && (
              <p className="text-sm text-body">
                {formValues.branch
                  ? 'No interests available for this branch.'
                  : 'Select a branch to see interests.'}
              </p>
            )}

            <div className="mt-2 flex flex-wrap gap-2">
              {availableInterests.map((interest) => {
                const isSelected = formValues.interests.includes(interest)
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                      isSelected
                        ? 'border-primary bg-primary text-white shadow-soft'
                        : 'border-primary/20 bg-card text-heading hover:border-primary/40 hover:bg-primary/5'
                    }`}
                  >
                    {interest}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Status / Error Message */}
          {saveMsg && (
            <p className={`text-sm ${saveMsg.startsWith('✅') ? 'text-emerald-600' : 'text-pink-700'}`}>
              {saveMsg}
            </p>
          )}

          <Button type="submit" className="w-full py-2.5">Save Profile</Button>
        </form>
      </Card>
    </div>
  )
}

export default Profile
