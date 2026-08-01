import { forwardRef } from 'react'
import type { TextareaHTMLAttributes } from 'react'
import { cx } from '@/lib/utils'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className, id, ...rest }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')
    return (
      <label htmlFor={inputId} className="block">
        <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.18em] text-paperdim">
          {label}
        </span>
        <textarea
          id={inputId}
          ref={ref}
          rows={3}
          className={cx(
            'w-full resize-none rounded-lg border border-line bg-ink-2 px-3.5 py-2.5 text-sm text-paper placeholder:text-paperdim/50 transition-colors focus:border-amber',
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

TextArea.displayName = 'TextArea'

export default TextArea
