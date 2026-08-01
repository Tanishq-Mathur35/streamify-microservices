import { cx } from '@/lib/utils'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'danger' | 'outline'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant
    fullWidth?: boolean
    icon?: ReactNode
    loading?: boolean
}

const variantClasses: Record<Variant, string> = {
    primary: 'bg-amber text-ink hover:bg-amber-dim shadow-knob',
    outline: 'border border-line text-paper hover:border-amber hover:text-amber',
    ghost: 'text-paperdim hover:text-paper hover:bg-white/5',
    danger: 'bg-coral/15 text-coral border border-coral/40 hover:bg-coral/25'
}

export default function Button({
    variant = 'primary',
    fullWidth,
    icon,
    loading,
    className,
    children,
    disabled,
    ...rest
}: ButtonProps) {
    return (
        <button
            className={cx(
                'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50',
                variantClasses[variant],
                fullWidth && 'w-full',
                className
            )}
            disabled={disabled || loading}
            {...rest}
        >
            {icon}
            {loading ? 'Working…' : children}
        </button>
    )
}
