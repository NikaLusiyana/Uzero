'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Book, Save } from 'lucide-react'

export default function AddBookPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    author: '',
    genre: '',
    summary: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      router.push('/books')
    } else {
      alert('Gagal menambahkan buku')
    }
  }

  return (
    <main>
      <div>
        <div className="flex items-center justify-between pb-16">
          <h1 className="text-3xl font-sans font-bold tracking-wide flex items-center gap-2">
            <Book size={20} strokeWidth={2.2} />
            Tambah Buku Baru
          </h1>
          <Link
            href="/books"
            className="text-xl font-semibold text-[var(--brand-accent)] hover:text-[var(--brand-gold)] transition-colors py-4"
          >
            ← ke Daftar Buku
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="text-xl space-y-4">
          <div>
            <label htmlFor="name" className="block font-semibold mb-1">
              Judul Buku
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-[var(--brand-dark)] bg-white text-black rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="author" className="block font-semibold mb-1">
              Penulis
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={form.author}
              onChange={handleChange}
              className="w-full border border-[var(--brand-dark)] bg-white text-black rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="genre" className="block font-semibold mb-1">
              Genre
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={form.genre}
              onChange={handleChange}
              className="w-full border border-[var(--brand-dark)] bg-white text-black rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="summary" className="block font-semibold mb-1">
              Ringkasan
            </label>
            <textarea
              id="summary"
              name="summary"
              value={form.summary}
              onChange={handleChange}
              rows={4}
              className="w-full border border-[var(--brand-dark)] bg-white text-black rounded-lg px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-lg bg-[var(--brand-gold)] hover:bg-[var(--brand-goldhover)] text-white font-semibold text-md transition"><Save size={16} />
            Simpan Buku
          </button>
        </form>
      </div>
    </main>
  )
}
