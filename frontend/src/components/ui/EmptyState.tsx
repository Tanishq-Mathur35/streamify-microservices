import type { ReactNode } from 'react'

interface EmptyStateProps {
    title: string
    description?: string
    action?: ReactNode
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center gap-3 rounded-deck border border-dashed border-line bg-ink-2/50 px-6 py-16 text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-coral">No signal</span>
            <h3 className="font-display text-xl text-paper">{title}</h3>
            {description && <p className="max-w-sm text-sm text-paperdim">{description}</p>}
            {action}
        </div>
    )
}
