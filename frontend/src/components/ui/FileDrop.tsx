import { cx } from '@/lib/utils'
import { UploadCloud } from 'lucide-react'
import { useRef, useState } from 'react'

interface FileDropProps {
    label: string
    accept: string
    onChange: (file: File | null) => void
    hint?: string
}

export default function FileDrop({ label, accept, onChange, hint }: FileDropProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [fileName, setFileName] = useState<string | null>(null)

    function handleFiles(files: FileList | null) {
        const file = files?.[0] ?? null
        setFileName(file?.name ?? null)
        onChange(file)
    }

    return (
        <div className="block">
            <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.18em] text-paperdim">
                {label}
            </span>
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                    event.preventDefault()
                    handleFiles(event.dataTransfer.files)
                }}
                className={cx(
                    'flex w-full items-center gap-3 rounded-lg border border-dashed border-line bg-ink-2 px-3.5 py-3 text-left text-sm transition-colors hover:border-amber',
                    fileName ? 'text-paper' : 'text-paperdim/70'
                )}
            >
                <UploadCloud size={18} className="shrink-0 text-mint" />
                <span className="truncate">{fileName ?? hint ?? 'Choose a file or drop it here'}</span>
            </button>
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                className="hidden"
                onChange={(event) => handleFiles(event.target.files)}
            />
        </div>
    )
}
