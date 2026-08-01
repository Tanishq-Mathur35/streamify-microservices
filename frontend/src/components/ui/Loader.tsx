export default function Loader({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-paperdim">
      <span className="h-2.5 w-2.5 animate-blink rounded-full bg-amber" />
      <span className="font-mono text-xs uppercase tracking-[0.2em]">{label}</span>
    </div>
  )
}
