export default function BooksLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="min-h-screen bg-[var(--brand-darker)] text-[var(--foreground)] px-4 py-12">
        <div className="max-w-7xl mx-auto px-12 py-12 rounded-2xl space-y-6 bg-[var(--brand-dark)]">
          {children}
        </div>
      </main>
    </>
  );
}
