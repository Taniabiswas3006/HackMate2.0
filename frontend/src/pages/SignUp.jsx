import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react'

import Footer from '../components/layout/Footer.jsx'
import Button from '../components/ui/Button.jsx'
import { useAuth } from '../context/useAuth.js'
import { getAllBranchInterests } from '../services/interestService.js'

const years = ['1', '2', '3', '4']
const genders = ['Male', 'Female', 'Other']

function SignUp() {
    const navigate = useNavigate()
    const { signup } = useAuth()
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')

    // Dynamic branch → interest map
    const [branchInterestsMap, setBranchInterestsMap] = useState({})
    const [loadingBranches, setLoadingBranches] = useState(true)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        gender: '',
        department: '',
        year: '',
        password: '',
        confirmPassword: '',
        interests: [],
    })

    // Fetch branches on mount
    useEffect(() => {
        getAllBranchInterests()
            .then((data) => setBranchInterestsMap(data))
            .catch(() => setBranchInterestsMap({}))
            .finally(() => setLoadingBranches(false))
    }, [])

    const departments = Object.keys(branchInterestsMap)
    const availableInterests = branchInterestsMap[formData.department] || []

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'department') {
            setFormData((prev) => ({ ...prev, department: value, interests: [] }))
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }))
        }
        setError('')
    }

    const toggleInterest = (interest) => {
        setFormData((prev) => {
            const updated = prev.interests.includes(interest)
                ? prev.interests.filter((i) => i !== interest)
                : [...prev.interests, interest]
            return { ...prev, interests: updated }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            return
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }
        if (formData.interests.length === 0) {
            setError('Please select at least one interest')
            return
        }
        const { confirmPassword: _, ...userData } = formData
        
        try {
            await signup({
                ...userData,
                branch: userData.department,
                year: `${userData.year}${userData.year === '1' ? 'st' : userData.year === '2' ? 'nd' : userData.year === '3' ? 'rd' : 'th'} Year`,
            })
            navigate('/dashboard')
        } catch (err) {
            setError(err.message || 'Failed to sign up')
        }
    }

    const inputWithIconClasses =
        'w-full rounded-xl border border-primary/20 bg-card px-4 py-3 pl-11 text-sm text-heading outline-none transition-all duration-200 placeholder:text-body/50 focus:border-primary focus:ring-2 focus:ring-primary/15'

    const selectClasses =
        'w-full rounded-xl border border-primary/20 bg-card px-4 py-3 text-sm text-heading outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/15 appearance-none cursor-pointer'

    return (
        <div className="flex min-h-screen flex-col bg-main">
            {/* Yellow shade decoration */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-secondary/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/4 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-1 items-center justify-center px-4 py-12 relative">
                <div className="w-full max-w-lg animate-fade-in-up">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-heading">Create Account</h1>
                        <p className="mt-2 text-sm text-body">
                            Join HackMate and start your skill journey
                        </p>
                    </div>

                    {/* Card */}
                    <div className="rounded-2xl border border-primary/10 bg-card p-8 shadow-soft">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="rounded-xl bg-highlight/15 px-4 py-2.5 text-sm text-pink-700">
                                    {error}
                                </div>
                            )}

                            {/* Full Name */}
                            <div>
                                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-heading">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-body/60" />
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className={inputWithIconClasses}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-heading">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-body/60" />
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        className={inputWithIconClasses}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-heading">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-body/60" />
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="9876543210"
                                        className={inputWithIconClasses}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Gender + Department Row */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="gender" className="mb-1.5 block text-sm font-medium text-heading">
                                        Gender
                                    </label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className={selectClasses}
                                        required
                                    >
                                        <option value="" disabled>Select gender</option>
                                        {genders.map((g) => (
                                            <option key={g} value={g}>{g}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="department" className="mb-1.5 block text-sm font-medium text-heading">
                                        Department
                                    </label>
                                    <select
                                        id="department"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className={selectClasses}
                                        required
                                        disabled={loadingBranches}
                                    >
                                        <option value="" disabled>
                                            {loadingBranches ? 'Loading...' : 'Select department'}
                                        </option>
                                        {departments.map((d) => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Year */}
                            <div>
                                <label htmlFor="year" className="mb-1.5 block text-sm font-medium text-heading">
                                    Year
                                </label>
                                <select
                                    id="year"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    className={selectClasses}
                                    required
                                >
                                    <option value="" disabled>Select year</option>
                                    {years.map((y) => (
                                        <option key={y} value={y}>Year {y}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Interests (dynamic pill selector) */}
                            {formData.department && availableInterests.length > 0 && (
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-heading">
                                        Interests{' '}
                                        <span className="text-xs font-normal text-body">(select at least one)</span>
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {availableInterests.map((interest) => {
                                            const isSelected = formData.interests.includes(interest)
                                            return (
                                                <button
                                                    key={interest}
                                                    type="button"
                                                    onClick={() => toggleInterest(interest)}
                                                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
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
                            )}

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-heading">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-body/60" />
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Min. 6 characters"
                                        className={`${inputWithIconClasses} pr-11`}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((p) => !p)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-body/60 transition-colors hover:text-primary"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-heading">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-body/60" />
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Re-enter password"
                                        className={inputWithIconClasses}
                                        required
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full py-3">
                                Create Account
                            </Button>
                        </form>

                        <p className="mt-6 text-center text-sm text-body">
                            Already have an account?{' '}
                            <Link to="/signin" className="font-medium text-primary transition-colors hover:text-primary-hover">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default SignUp
