import { useEffect, useState } from 'react'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'
import Loader from '../components/ui/Loader.jsx'
import { useAuth } from '../context/useAuth.js'
import { getAllBranchInterests } from '../services/interestService.js'

function Profile() {
  const { currentUser, updateProfile } = useAuth()

  const [branchInterestsMap, setBranchInterestsMap] = useState({})
  const [loadingInterests, setLoadingInterests] = useState(true)
  const [fetchError, setFetchError] = useState(null)
  const [saveMsg, setSaveMsg] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const [formValues, setFormValues] = useState(() => ({
    name: currentUser.name,
    branch: currentUser.department || currentUser.branch || '',
    year: String(currentUser.year).replace(/\D/g, '') || '2',
    interests: currentUser.interests || [],
  }))

  useEffect(() => {
    if (!formValues.branch && Object.keys(branchInterestsMap).length > 0) {
      setFormValues((prev) => ({ ...prev, branch: Object.keys(branchInterestsMap)[0] }))
    }
  }, [branchInterestsMap, formValues.branch])

  useEffect(() => {
    let active = true

    const fetchData = async () => {
      setLoadingInterests(true)
      setFetchError(null)
      try {
        const data = await getAllBranchInterests()
        if (active) setBranchInterestsMap(data)
      } catch (err) {
        if (active) setFetchError(err.message || 'Failed to load interests')
      } finally {
        if (active) setLoadingInterests(false)
      }
    }

    fetchData()
    return () => { active = false }
  }, [])

  const availableInterests = branchInterestsMap[formValues.branch] || []

  const handleChange = (event) => {
    const { name, value } = event.target
    if (name === 'branch') {
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
    setIsSaving(true)
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
      setSaveMsg('Profile saved! Head to the Dashboard to see your personalised results.')
    } catch (err) {
      setSaveMsg(`Error: ${err.message || 'Error updating profile'}`)
    } finally {
      setIsSaving(false)
    }
  }

  const inputClasses =
    'w-full rounded-xl border border-primary/20 bg-card px-4 py-2.5 text-sm text-heading outline-none transition-all duration-200 placeholder:text-body/50 focus:border-primary focus:ring-2 focus:ring-primary/15'

  const selectClasses =
    'w-full rounded-xl border border-primary/20 bg-card px-4 py-2.5 text-sm text-heading outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/15 appearance-none cursor-pointer'

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-primary p-6 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        <div className="relative flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm text-3xl font-bold text-white ring-4 ring-white/30">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{currentUser.name}</h1>
            <p className="mt-1 text-white/80">
              {currentUser.department || currentUser.branch || 'Set your branch'} · {currentUser.year || 'Set your year'}
            </p>
            {currentUser.interests?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {currentUser.interests.slice(0, 3).map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                  >
                    {interest}
                  </span>
                ))}
                {currentUser.interests.length > 3 && (
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    +{currentUser.interests.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="!p-5">
          <p className="text-xs font-medium text-body">Branch</p>
          <p className="mt-1 text-lg font-semibold text-heading">{currentUser.department || currentUser.branch || 'Not set'}</p>
        </Card>
        <Card className="!p-5">
          <p className="text-xs font-medium text-body">Year</p>
          <p className="mt-1 text-lg font-semibold text-heading">{currentUser.year || 'Not set'}</p>
        </Card>
        <Card className="!p-5">
          <p className="text-xs font-medium text-body">Interests</p>
          <p className="mt-1 text-lg font-semibold text-heading">{currentUser.interests?.length || 0} selected</p>
        </Card>
      </div>

      {/* Edit Form */}
      <Card title="Edit Profile" subtitle="Update your details for better recommendations">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-heading">
                Full Name
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

            <div>
              <label htmlFor="branch" className="mb-1.5 block text-sm font-medium text-heading">
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
                  <option value="" disabled>Select your branch</option>
                  {Object.keys(branchInterestsMap).map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="year" className="mb-1.5 block text-sm font-medium text-heading">
              Year of Study
            </label>
            <select
              id="year"
              name="year"
              value={formValues.year}
              onChange={handleChange}
              className="max-w-xs rounded-xl border border-primary/20 bg-card px-4 py-2.5 text-sm text-heading outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/15 appearance-none cursor-pointer"
              required
            >
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-heading">
              Your Interests <span className="text-xs font-normal text-body">(select at least one)</span>
            </label>

            {availableInterests.length === 0 && !loadingInterests && (
              <p className="text-sm text-body">
                {formValues.branch
                  ? 'No interests available for this branch.'
                  : 'Select a branch to see interests.'}
              </p>
            )}

            <div className="flex flex-wrap gap-2">
              {availableInterests.map((interest) => {
                const isSelected = formValues.interests.includes(interest)
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      isSelected
                        ? 'border-primary bg-primary text-white shadow-soft'
                        : 'border-primary/20 bg-card text-heading hover:border-primary/40 hover:bg-primary/5'
                    }`}
                  >
                    {isSelected && <span className="mr-1.5">*</span>}
                    {interest}
                  </button>
                )
              })}
            </div>
          </div>

          {saveMsg && (
            <div className={`rounded-xl p-4 text-sm font-medium ${
              saveMsg.includes('saved') 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                : 'bg-pink-50 text-pink-700 border border-pink-200'
            }`}>
              {saveMsg}
            </div>
          )}

          <Button type="submit" className="w-full py-3" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Profile'}
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default Profile