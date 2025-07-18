// app/api/books/route.ts

import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// ✅ GET ALL BOOKS
export async function GET() {
  const books = await prisma.book.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(books)
}

// ✅ ADD NEW BOOK
export async function POST(req: Request) {
  const data = await req.json()

  const newBook = await prisma.book.create({
    data: {
      name: data.name,
      author: data.author || null,
      genre: data.genre || null,
      summary: data.summary || null,
    },
  })

  return NextResponse.json(newBook, { status: 201 })
}

// ✅ UPDATE BOOK
export async function PUT(req: Request) {
  const data = await req.json()

  if (!data.id) {
    return new Response(JSON.stringify({ error: 'ID diperlukan untuk update' }), { status: 400 })
  }

  const updatedBook = await prisma.book.update({
    where: { id: Number(data.id) },
    data: {
      name: data.name,
      author: data.author || null,
      genre: data.genre || null,
      summary: data.summary || null,
    },
  })

  return NextResponse.json(updatedBook)
}

// ✅ DELETE BOOK
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

  await prisma.book.delete({ where: { id: numericId } })

  return new Response(JSON.stringify({ message: 'Buku dihapus' }), { status: 200 })
}
