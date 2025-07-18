'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Books', href: '/books' },
    { name: 'Chapter', href: '/chapter' },
    { name: 'Worldbuilding', href: '/worldbuilding' },
    { name: 'Glossary', href: '/glossary' },
  ]

  // ✅ Fungsi untuk mengecek apakah link aktif
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-8 border-b border-[var(--brand-dark)] bg-[var(--background)] text-[var(--brand-accent)] backdrop-blur-md bg-opacity-90">
      <a href="/">
        <div className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Uzero Logo"
            width={24}
            height={24}
          />
          <span className="text-2xl font-semibold tracking-wide">UZERO COMPANION</span>  
        </div>
      </a>
      
      <div className="flex items-center space-x-4 text-lg font-semibold">
        {navItems.map(({ name, href }, index) => (
          <div key={href} className="flex items-center space-x-4">
            <Link
              href={href}
              className={`transition-colors hover:text-[var(--brand-gold)] ${
                isActive(href) ? 'text-2xl text-[var(--brand-gold)]' : ''
              }`}
            >
              {name}
            </Link>

            {/* Garis pemisah '|' */}
            {index < navItems.length - 1 && (
              <span className="text-[var(--brand-accent)]">|</span>
            )}
          </div>
        ))}
      </div>
    </nav>
  )
}
