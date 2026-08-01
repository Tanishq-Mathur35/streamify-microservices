import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Radio } from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useLogin } from '@/hooks/useAuth'
import { extractErrorMessage } from '@/lib/api'

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useLogin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    login.mutate(
      { email, password },
      { onSuccess: () => navigate('/') }
    )
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-md flex-col justify-center px-4 py-16">
      <div className="mb-8 text-center">
        <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-line bg-ink-3">
          <Radio size={22} className="text-amber" />
        </span>
        <h1 className="font-display text-3xl font-semibold text-paper">Tune back in</h1>
        <p className="mt-2 text-sm text-paperdim">Sign in to pick up where you left off.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-deck border border-line bg-ink-2 p-6 shadow-deck">
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
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="••••••••"
        />

        {login.isError && (
          <p className="rounded-lg bg-coral/10 px-3 py-2 text-sm text-coral">
            {extractErrorMessage(login.error)}
          </p>
        )}

        <Button type="submit" fullWidth loading={login.isPending}>
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-paperdim">
        New here?{' '}
        <Link to="/register" className="font-medium text-mint hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  )
}
