'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Book, Save } from 'lucide-react'

type BookType = {
  id: number
  name: string
  author?: string
  genre?: string
  summary?: string
  createdAt?: string
}

export default function EditBookPage() {
  const { id } = useParams()
  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    author: '',
    genre: '',
    summary: '',
  })

  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch('/api/books')
      const books: BookType[] = await res.json()
      const book = books.find((b) => b.id === Number(id))
      if (book) setForm({
        name: book.name || '',
        author: book.author || '',
        genre: book.genre || '',
        summary: book.summary || '',
      })
    }
    fetchBook()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/books', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: Number(id), ...form }),
    })
    if (res.ok) {
      router.push('/books')
    } else {
      alert('Gagal memperbarui buku')
    }
  }

  return (
    <main>
      <div>
        <div className="flex items-start justify-between pb-16">
          <h1 className="text-3xl font-sans font-bold tracking-wide flex items-center gap-2">
            <Book size={20} strokeWidth={2.2} />
            Edit Buku
          </h1>
          <Link
            href="/books"
            className="text-xl font-semibold text-[var(--brand-accent)] hover:text-[var(--brand-gold)] transition-colors py-4"
          >
            ← ke Daftar Buku
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="text-xl space-y-4">
          <label htmlFor="name" className="block font-semibold mb-1">Judul Buku</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Judul" className="w-full border border-[var(--brand-dark)] bg-white text-black rounded-lg px-3 py-2" />
          
          <label htmlFor="author" className="block font-semibold mb-1">Penulis</label>
          <input type="text" name="author" value={form.author} onChange={handleChange} placeholder="Penulis" className="w-full border border-[var(--brand-dark)] bg-white text-black rounded-lg px-3 py-2" />
          
          <label htmlFor="genre" className="block font-semibold mb-1">Genre</label>
          <input type="text" name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" className="w-full border border-[var(--brand-dark)] bg-white text-black rounded-lg px-3 py-2" />
          
          <label htmlFor="summary" className="block font-semibold mb-1">Ringkasan</label>
          <textarea name="summary" value={form.summary} onChange={handleChange} placeholder="Ringkasan" className="w-full border border-[var(--brand-dark)] bg-white text-black rounded-lg px-3 py-2" />
          
          <button type="submit" className="inline-flex items-center gap-2 px-6 py-4 rounded-lg bg-[var(--brand-gold)] hover:bg-[var(--brand-goldhover)] text-white font-semibold text-md transition"><Save size={16} />Update Buku</button>
        </form>
      </div>
    </main>
  )
}
