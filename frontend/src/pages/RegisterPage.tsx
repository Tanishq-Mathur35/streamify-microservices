import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useRegister } from '@/hooks/useAuth'
import { extractErrorMessage } from '@/lib/api'
import { Radio } from 'lucide-react'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function RegisterPage() {
    const navigate = useNavigate()
    const register = useRegister()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        register.mutate(
            { name, email, password },
            { onSuccess: () => navigate('/') }
        )
    }

    return (
        <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-md flex-col justify-center px-4 py-16">
            <div className="mb-8 text-center">
                <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-line bg-ink-3">
                    <Radio size={22} className="text-amber" />
                </span>
                <h1 className="font-display text-3xl font-semibold text-paper">Get on the air</h1>
                <p className="mt-2 text-sm text-paperdim">Create an account to start building queues.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 rounded-deck border border-line bg-ink-2 p-6 shadow-deck">
                <Input
                    label="Name"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your name"
                />
                <Input
                    label="Email"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                />
                <Input
                    label="Password"
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="At least 6 characters"
                />

                {register.isError && (
                    <p className="rounded-lg bg-coral/10 px-3 py-2 text-sm text-coral">
                        {extractErrorMessage(register.error)}
                    </p>
                )}

                <Button type="submit" fullWidth loading={register.isPending}>
                    Create account
                </Button>
            </form>

            <p className="mt-6 text-center text-sm text-paperdim">
                Already registered?{' '}
                <Link to="/login" className="font-medium text-mint hover:underline">
                    Sign in
                </Link>
            </p>
        </div>
    )
}
