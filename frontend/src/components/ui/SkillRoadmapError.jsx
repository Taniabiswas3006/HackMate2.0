import { ChevronLeft, AlertCircle, RefreshCw, Home, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

function SkillRoadmapError({ skill, onBack, error }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Back button */}
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-body hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back to roadmap</span>
        </button>

        {/* Error Card */}
        <div className="rounded-3xl border-2 border-primary/20 bg-card p-8 shadow-soft-lg text-center">
          {/* Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <AlertCircle className="h-10 w-10 text-primary" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-heading mb-3">
            Unable to Generate Roadmap
          </h2>

          {/* Description */}
          <p className="text-body mb-6">
            We couldn't generate the {skill} roadmap at this moment. This might be due to:
          </p>

          {/* Possible reasons */}
          <ul className="text-left text-sm text-body space-y-2 mb-8 bg-secondary/10 rounded-xl p-4">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>API service is temporarily unavailable</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Network connectivity issues</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Please complete your profile with branch and interests</span>
            </li>
          </ul>

          {/* Error message if exists */}
          {error && (
            <div className="text-xs text-body/60 mb-6 p-3 bg-red-50 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
            <Link
              to="/dashboard"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-card px-6 py-3 text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
            >
              <Home className="h-4 w-4" />
              Go to Dashboard
            </Link>
          </div>
        </div>

        {/* Help text */}
        <p className="mt-6 text-center text-sm text-body/60">
          Need help? <span className="text-primary font-medium cursor-pointer hover:underline">Contact support</span>
        </p>
      </div>
    </div>
  )
}

export default SkillRoadmapError