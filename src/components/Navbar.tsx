'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Books', href: '/books' },
    { name: 'Chapters', href: '/chapters' },
    { name: 'Worldbuilding', href: '/worldbuilding' },
    { name: 'Glossary', href: '/glossary' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-[var(--brand-dark)] bg-[var(--background)] text-[var(--brand-accent)] backdrop-blur-md bg-opacity-90">
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/logo.png"
          alt="Uzero Logo"
          width={20}
          height={20}
        />
        <span className="text-lg font-semibold tracking-wide">UZERO COMPANION</span>
      </Link>

      <div className="flex items-center space-x-3 text-sm font-semibold">
        {navItems.map(({ name, href }, index) => (
          <div key={href} className="flex items-center space-x-3">
            <Link
              href={href}
              className={`transition-colors hover:text-[var(--brand-gold)] ${
                isActive(href) ? 'text-base text-[var(--brand-gold)]' : ''
              }`}
            >
              {name}
            </Link>

            {index < navItems.length - 1 && (
              <span className="text-[var(--brand-accent)]">|</span>
            )}
          </div>
        ))}
      </div>
    </nav>
  )
}
