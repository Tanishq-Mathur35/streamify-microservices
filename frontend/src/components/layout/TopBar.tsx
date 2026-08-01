import { cx, initials } from '@/lib/utils'
import { useAuthStore } from '@/store/authStore'
import { LogOut, Radio, ShieldCheck } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

export default function TopBar() {
    const user = useAuthStore((state) => state.user)
    const clearSession = useAuthStore((state) => state.clearSession)

    return (
        <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
                <Link to="/" className="flex items-center gap-2">
                    <Radio size={20} className="text-amber" />
                    <span className="font-display text-xl font-semibold tracking-tight text-paper">
                        Streamify
                    </span>
                    <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-mint sm:inline">
                        On air
                    </span>
                </Link>

                <nav className="flex items-center gap-1">
                    <NavItem to="/">Library</NavItem>
                    {user?.role === 'admin' && <NavItem to="/admin">Studio</NavItem>}
                </nav>

                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            <div className="hidden items-center gap-2 sm:flex">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-3 font-mono text-xs text-amber">
                                    {initials(user.name)}
                                </span>
                                <span className="max-w-[120px] truncate text-sm text-paperdim">{user.name}</span>
                                {user.role === 'admin' && <ShieldCheck size={14} className="text-mint" />}
                            </div>
                            <button
                                type="button"
                                onClick={() => clearSession()}
                                className="flex h-9 w-9 items-center justify-center rounded-full text-paperdim transition-colors hover:bg-white/5 hover:text-coral"
                                aria-label="Log out"
                            >
                                <LogOut size={16} />
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="rounded-full bg-amber px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-amber-dim"
                        >
                            Sign in
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}

function NavItem({ to, children }: { to: string; children: string }) {
    return (
        <NavLink
            to={to}
            end
            className={({ isActive }) =>
                cx(
                    'rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
                    isActive ? 'bg-ink-3 text-amber' : 'text-paperdim hover:text-paper'
                )
            }
        >
            {children}
        </NavLink>
    )
}
