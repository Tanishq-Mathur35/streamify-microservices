import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useCurrentUser } from '@/hooks/useAuth'
import Loader from '@/components/ui/Loader'
import EmptyState from '@/components/ui/EmptyState'

export default function AdminRoute() {
  const token = useAuthStore((state) => state.token)
  const { data: user, isLoading } = useCurrentUser()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (isLoading) {
    return <Loader label="Verifying clearance" />
  }

  if (user?.role !== 'admin') {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <EmptyState
          title="Studio access required"
          description="This control room is only open to admin accounts. Sign in with an admin account to manage the catalog."
        />
      </div>
    )
  }

  return <Outlet />
}
