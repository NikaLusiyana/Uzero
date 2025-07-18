'use client'

import { ReactNode } from 'react'

interface ActionButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
}

export default function ActionButton({ children, icon, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-md bg-[var(--brand-gold)] text-[var(--brand-darker)] px-4 py-2 font-medium text-md hover:bg-[var(--brand-goldhover)] hover:text-[var(--brand-accent)] transition-colors"
    >
      {icon}
      {children}
    </button>
  )
}
