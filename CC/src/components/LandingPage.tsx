import type { FC } from 'react'

type LandingPageProps = {
  onSelectApp: (app: 'vallunex' | 'afs') => void
}

export const LandingPage: FC<LandingPageProps> = ({ onSelectApp }) => {
  return (
    <div className="landing-shell">
      <header className="landing-navbar">
        <div className="landing-logo">
          <span className="logo-mark">V</span>
          <div className="logo-text">
            <span className="logo-title">Vallunex</span>
            <span className="logo-subtitle">Suite</span>
          </div>
        </div>
        <nav className="landing-navbar-links" aria-label="Main navigation">
          <button type="button" className="landing-nav-link" onClick={() => onSelectApp('vallunex')}>
            CC
          </button>
          <button type="button" className="landing-nav-link" onClick={() => onSelectApp('afs')}>
            AFS
          </button>
        </nav>
      </header>

      <div className="landing-header">
        <h1>Welcome to Vallunex Premier Portal</h1>
        <p className="landing-tagline">
          This is your main landing page. Click <strong>CC</strong> in the navbar to open Vallunex
          login.
        </p>
      </div>

      <div className="landing-grid">
        <button
          type="button"
          className="landing-card"
          onClick={() => onSelectApp('vallunex')}
        >
          <h2>Vallunex Command Center</h2>
          <p>
            Existing operations hub for projects, teams and payroll. Recommended for your current
            Vallunex CC users.
          </p>
        </button>

        <button
          type="button"
          className="landing-card"
          onClick={() => onSelectApp('afs')}
        >
          <h2>AFS</h2>
          <p>
            Advanced allocation &amp; billing system. Opens the AFS experience with its own
            authentication and backend.
          </p>
        </button>
      </div>
    </div>
  )
}

