import { useAuthStore } from '@/store/authStore'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function ProtectedRoute() {
    const token = useAuthStore((state) => state.token)
    const location = useLocation()

    if (!token) {
        return <Navigate to="/login" replace state={{ from: location }} />
    }

    return <Outlet />
}
