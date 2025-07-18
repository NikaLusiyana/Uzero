import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

type Book = {
  id: number
  name: string
  author?: string
  genre?: string
  summary?: string
  createdAt?: string
}

let books: Book[] = []

// GET ALL BOOKS
export async function GET() {
  return NextResponse.json(books)
}

// ADD NEW BOOK
export async function POST(req: Request) {
  const data = await req.json()
  const newBook: Book = {
    id: Date.now(),
    ...data,
    createdAt: new Date().toISOString(),
  }
  books.push(newBook)
  return NextResponse.json(newBook, { status: 201 })
}

// UPDATE BOOK
export async function PUT(req: Request) {
  const data = await req.json()
  const index = books.findIndex((b) => b.id === data.id)
  if (index === -1) {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 })
  }
  books[index] = { ...books[index], ...data }
  return NextResponse.json(books[index])
}

// DELETE BOOK
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return new Response(JSON.stringify({ error: 'ID tidak ditemukan' }), { status: 400 })
  }

  const numericId = Number(id)
  if (isNaN(numericId)) {
    return new Response(JSON.stringify({ error: 'ID tidak valid' }), { status: 400 })
  }

  books = books.filter((book) => book.id !== numericId)

  return new Response(JSON.stringify({ message: 'Buku dihapus' }), { status: 200 })
}

