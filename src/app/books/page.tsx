'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { PlusCircle } from 'lucide-react'
import { Book } from 'lucide-react'
import { Pencil, Trash2 } from 'lucide-react'


type Book = {
  id: number
  name: string
  author?: string
  genre?: string
  summary?: string
  createdAt?: string
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])

  //ambil data dari API
  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch('/api/books')
      const data = await res.json()
      setBooks(data)
    }

    fetchBooks()
  }, [])

  const router = useRouter()

    // 🔁 Fungsi-fungsi aksi
  const handleEdit = (id: number) => {
    router.push(`/books/edit/${id}`)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Yakin ingin menghapus buku ini?')) {
      const res = await fetch(`/api/books?id=${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        // Refresh list
        setBooks((prev) => prev.filter((book) => book.id !== id))
      } else {
        alert('Gagal menghapus buku')
      }
    }
}

  return (
   <main>
    <div>
      <div className="flex items-center justify-between pb-16">
        <h1 className="text-3xl font-sans font-bold tracking-wide flex items-center gap-2">
          <Book size={20} strokeWidth={2.2} />
          Daftar Buku
        </h1>
        <Link
          href="/books/add"
          className="inline-flex items-center gap-2 bg-[var(--brand-gold)] hover:bg-[var(--brand-goldhover)] text-white text-lg px-4 py-4 rounded-lg font-semibold transition"
        >
          <PlusCircle size={20} />
          Tambah Buku
        </Link>
      </div>

      <div className="text-xl space-y-4">
        {books.length === 0 ? (
            <p className="text-brand-accent italic">Belum ada buku yang ditambahkan.</p>
          ) : (
            <ul className="grid gap-4">
              {books.map((book) => (
                <li
                  key={book.id}
                  className="p-4 rounded-xl border border-transparent bg-transparent text-[var(--brand-gold)] shadow-sm"
                >
                  <div className="py-2">
                    <h2 className="text-2xl font-serif font-bold">{book.name}</h2>
                    {book.author && <p className="text-lg text-[var(--brand-accent)]">oleh {book.author}</p>}
                  </div>
                  {book.genre && <p className="text-sm text-white">Genre: {book.genre}</p>}
                  {book.summary && <p className="mt-2 text-lg text-white">{book.summary}</p>}

                  {/* Tombol aksi */}
                  <div className="mt-4 flex space-x-4">
                    <button
                      onClick={() => handleEdit(book.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--brand-gold)] hover:bg-[var(--brand-goldhover)] text-white font-semibold text-lg transition"
                    >
                      <Pencil size={16} /> Update
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-700 hover:bg-red-800 text-white font-semibold text-lg transition"
                    >
                      <Trash2 size={16} /> Hapus
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  )
}
