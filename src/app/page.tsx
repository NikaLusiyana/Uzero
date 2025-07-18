import Link from 'next/link'
import { Book, ScrollText, Globe2, LibraryBig } from 'lucide-react'
import ActionButton from '@/components/ActionButton'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen flex items-start justify-center bg-[var(--darker)] text-brand-light px-4 py-20">
      <div className="max-w-5xl text-center space-y-6">
        <div className="flex justify-center">
          <Image 
            src="/logo.png" 
            alt="Uzero Logo" 
            width={192} 
            height={192}
            className="w-48 h-48 mx-auto mb-4" 
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-wide font-serif text-brand-light">
          UZERO <br/>
          COMPANION
        </h1>

        <p className="text-base text-[var(--brand-gold)] leading-relaxed font-serif italic space-y-2">
          <span>Di dunia yang pernah diberkati lalu dikutuk,</span><br />
          <span>warisan tidak hanya berupa darah, tapi juga dosa.</span><br />
          <span>
            Kisah ini tertulis bukan dalam tinta, melainkan dalam tekad dan kehilangan.
          </span><br /><br />
          <span>
            Selamat datang di Uzero. <br />
            Di sinilah warisan terakhir dibisikkan dari reruntuhan,
          </span><br />
          <span>dan dosa pertama menolak dilupakan.</span>
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4 px-4">
          <Link href="/books/add">
            <ActionButton icon={<Book size={16} />}>Add Book</ActionButton>
          </Link>
          <ActionButton icon={<ScrollText size={16} />}>Add Chapter</ActionButton>
          <ActionButton icon={<Globe2 size={16} />}>Add Worldbuilding Details</ActionButton>
          <ActionButton icon={<LibraryBig size={16} />}>Add Glossary</ActionButton>
        </div>
      </div>
    </main>
  );
}
