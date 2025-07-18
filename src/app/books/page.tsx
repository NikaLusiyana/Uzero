'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { PlusCircle, Pencil, Trash2, Book as BookIcon } from 'lucide-react'
import { Book } from '@/generated/prisma/client'

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const res = await fetch('/api/books')
        if (!res.ok) throw new Error('Gagal mengambil data buku')
        const data: Book[] = await res.json()
        setBooks(data)
      } catch (err) {
        console.error('Error:', err)
        setError('Gagal memuat buku. Silakan coba lagi.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBooks()
  }, [])
  
  const handleEdit = (id: number) => {
    router.push(`/books/edit/${id}`)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Yakin ingin menghapus buku ini?')) {
      try {
        const res = await fetch(`/api/books?id=${id}`, {
          method: 'DELETE',
        })

        if (!res.ok) throw new Error('Gagal menghapus buku')
        setBooks(prev => prev.filter(book => book.id !== id))
      } catch (err) {
        console.error('Error:', err)
        alert('Gagal menghapus buku. Silakan coba lagi.')
      }
    }
  }

  if (isLoading) return <div className="p-4 text-center">Memuat buku...</div>
  if (error) return <div className="p-4 text-red-500">{error}</div>

  return (
    <main>
      <div>
        <div className="flex items-start justify-between pb-16">
          <h1 className="text-3xl font-sans font-bold tracking-wide flex items-center gap-2">
            <BookIcon size={20} strokeWidth={2.2} />
            Daftar Buku
          </h1>
          <Link
            href="/books/add"
            className="flex items-center gap-2 bg-[var(--brand-gold)] hover:bg-[var(--brand-goldhover)] text-white px-4 py-2 rounded-lg font-medium transition-colors"
            aria-label="Tambah buku baru"
          >
            <PlusCircle className="w-5 h-5" />
            Tambah Buku
          </Link>
        </div>

        <div className="space-y-4">
          {books.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[var(--brand-accent)] italic">Belum ada buku yang ditambahkan.</p>
              <Link href="/books/add" className="text-[var(--brand-gold)] hover:underline mt-2 inline-block">
                Tambah buku pertama Anda
              </Link>
            </div>
          ) : (
            <ul className="grid gap-4">
              {books.map(book => (
                <li
                  key={book.id}
                  className="p-4 rounded-lg border border-transparent bg-[var(--brand-darker)] shadow-sm"
                >
                  <div className="py-2">
                    <h2 className="text-2xl font-serif font-bold text-[var(--brand-gold)]">{book.name}</h2>
                    {book.author && (
                      <p className="text-[var(--brand-accent)]">oleh {book.author}</p>
                    )}
                  </div>
                  {book.genre && (
                    <p className="text-sm text-white">Genre: {book.genre}</p>
                  )}
                  {book.summary && (
                    <p className="mt-2 text-white">{book.summary}</p>
                  )}

                  <div className="mt-4 flex gap-4">
                    <button
                      onClick={() => handleEdit(book.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--brand-gold)] hover:bg-[var(--brand-goldhover)] text-white font-semibold"
                      aria-label={`Edit ${book.name}`}
                    >
                      <Pencil className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-700 hover:bg-red-800 text-white font-semibold"
                      aria-label={`Hapus ${book.name}`}
                    >
                      <Trash2 className="w-4 h-4" /> Hapus
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