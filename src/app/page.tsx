import Link from 'next/link'
import { Book, ScrollText, Globe2, LibraryBig } from 'lucide-react'
import ActionButton from '@/components/ActionButton'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen flex items-start justify-center bg-[var(--darker)] text-brand-light px-4 py-12">
      <div className="max-w-4xl text-center space-y-4">
        <div className="flex justify-center">
          <Image 
            src="/logo.png" 
            alt="Uzero Logo" 
            width={128} 
            height={128}
            className="w-32 h-32 mx-auto mb-3" 
          />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-wide font-serif text-brand-light">
          UZERO <br/>
          COMPANION
        </h1>

        <p className="text-sm text-[var(--brand-gold)] leading-relaxed font-serif italic space-y-1">
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
          <Link href="/chapters/add"><ActionButton icon={<ScrollText size={16} />}>Add Chapter</ActionButton></Link>
          <Link href="/worldbuilding/add"><ActionButton icon={<Globe2 size={16} />}>Add Worldbuilding</ActionButton></Link>
          <Link href="/glossary/add"><ActionButton icon={<LibraryBig size={16} />}>Add Glossary</ActionButton></Link>
        </div>
      </div>
    </main>
  );
}
