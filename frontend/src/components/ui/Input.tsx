import { cx } from '@/lib/utils'
import type { InputHTMLAttributes } from 'react'
import { forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className, id, ...rest }, ref) => {
        const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')
        return (
            <label htmlFor={inputId} className="block">
                <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.18em] text-paperdim">
                    {label}
                </span>
                <input
                    id={inputId}
                    ref={ref}
                    className={cx(
                        'w-full rounded-lg border border-line bg-ink-2 px-3.5 py-2.5 text-sm text-paper placeholder:text-paperdim/50 transition-colors focus:border-amber',
                        error && 'border-coral',
                        className
                    )}
                    {...rest}
                />
                {error && <span className="mt-1 block text-xs text-coral">{error}</span>}
            </label>
        )
    }
)

Input.displayName = 'Input'

export default Input
