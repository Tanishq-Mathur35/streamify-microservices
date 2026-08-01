import { cx } from '@/lib/utils'

export default function VUMeter({ active }: { active: boolean }) {
    const bars = [0, 1, 2, 3, 4]
    return (
        <div className="flex h-6 items-end gap-[3px]">
            {bars.map((bar) => (
                <span
                    key={bar}
                    className={cx(
                        'w-[3px] rounded-full bg-mint origin-bottom',
                        active ? 'animate-vu' : 'h-1.5 opacity-40'
                    )}
                    style={
                        active
                            ? { height: '100%', animationDelay: `${bar * 0.11}s`, animationDuration: `${0.7 + bar * 0.08}s` }
                            : undefined
                    }
                />
            ))}
        </div>
    )
}
