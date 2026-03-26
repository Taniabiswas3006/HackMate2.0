import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

import Footer from '../components/layout/Footer.jsx'
import Button from '../components/ui/Button.jsx'
import { useAuth } from '../context/useAuth.js'

function SignIn() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields')
            return
        }
        try {
            await login(formData.email, formData.password)
            navigate('/dashboard')
        } catch (err) {
            setError(err.message || 'Invalid credentials')
        }
    }

    const inputClasses =
        'w-full rounded-xl border border-primary/20 bg-card px-4 py-3 pl-11 text-sm text-heading outline-none transition-all duration-200 placeholder:text-body/50 focus:border-primary focus:ring-2 focus:ring-primary/15'

    return (
        <div className="flex min-h-screen flex-col bg-main">
            {/* Yellow shade decoration */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-secondary/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/4 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-1 items-center justify-center px-4 py-16 relative">
                <div className="w-full max-w-md animate-fade-in-up">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-heading">Welcome Back</h1>
                        <p className="mt-2 text-sm text-body">
                            Sign in to continue your learning journey
                        </p>
                    </div>

                    {/* Card */}
                    <div className="rounded-2xl border border-primary/10 bg-card p-8 shadow-soft">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="rounded-xl bg-highlight/15 px-4 py-2.5 text-sm text-pink-700">
                                    {error}
                                </div>
                            )}

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
                                        className={inputClasses}
                                        required
                                    />
                                </div>
                            </div>

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
                                        placeholder="Enter your password"
                                        className={`${inputClasses} pr-11`}
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

                            <Button type="submit" className="w-full py-3">
                                Sign In
                            </Button>
                        </form>

                        <p className="mt-6 text-center text-sm text-body">
                            Don't have an account?{' '}
                            <Link to="/signup" className="font-medium text-primary transition-colors hover:text-primary-hover">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default SignIn
