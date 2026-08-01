import type { ReactNode } from 'react'

interface AdminPanelProps {
    eyebrow: string
    title: string
    description: string
    children: ReactNode
}

export default function AdminPanel({ eyebrow, title, description, children }: AdminPanelProps) {
    return (
        <section className="rounded-deck border border-line bg-ink-2 p-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-mint">{eyebrow}</span>
            <h2 className="mt-1.5 font-display text-xl font-semibold text-paper">{title}</h2>
            <p className="mt-1 text-sm text-paperdim">{description}</p>
            <div className="mt-5">{children}</div>
        </section>
    )
}
