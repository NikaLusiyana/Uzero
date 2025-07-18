// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="sticky bottom-0 bg-[var(--background)] text-[var(--brand-accent)] py-6 mt-16 border-t border-[var(--brand-dark)]">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-md">&copy; {new Date().getFullYear()} Nika Lusiyana. All rights reserved.</p>
        <div className="flex gap-6 text-md font-medium">
          <a href="/about" className="hover:text-[var(--brand-gold)] transition">Tentang</a>
          <a href="/contact" className="hover:text-[var(--brand-gold)] transition">Kontak</a>
        </div>
      </div>
    </footer>
  )
}
