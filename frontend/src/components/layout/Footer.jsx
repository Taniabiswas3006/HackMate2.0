import { Code2, ExternalLink, Globe, Heart, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

const footerLinks = {
  Product: [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Skill Roadmap', href: '/roadmap' },
    { name: 'Opportunities', href: '/opportunities' },
    { name: 'Peer Connect', href: '/peers' },
  ],
  Resources: [
    { name: 'Documentation', href: '#' },
    { name: 'API Reference', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Changelog', href: '#' },
  ],
  Company: [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Privacy Policy', href: '#' },
  ],
}

const socials = [
  { icon: Globe, href: '#', label: 'Website' },
  { icon: ExternalLink, href: '#', label: 'GitHub' },
  { icon: Mail, href: '#', label: 'Email' },
  { icon: Heart, href: '#', label: 'Support' },
]

function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-secondary/10">
      {/* Main Footer */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-5">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Code2 className="h-4 w-4 text-primary" />
              </div>
              <span className="text-lg font-semibold text-heading">HackMate</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-body">
              Personalized skill growth and opportunity platform built for students.
              Track, learn, and collaborate your way to success.
            </p>
            {/* Socials */}
            <div className="mt-5 flex gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-section text-body transition-all duration-200 hover:bg-primary/10 hover:text-primary"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-heading">{title}</h3>
              <ul className="mt-3 space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-body transition-colors duration-200 hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary/5 bg-secondary/20">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-body sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} HackMate. All rights reserved.</p>
          <p>
            Made with <span className="text-highlight">♥</span> for students
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
