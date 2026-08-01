import { Link } from 'react-router-dom'
import EmptyState from '@/components/ui/EmptyState'
import Button from '@/components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <EmptyState
        title="This frequency is dead air"
        description="The page you're looking for isn't broadcasting. Head back to the library."
        action={
          <Link to="/">
            <Button>Back to library</Button>
          </Link>
        }
      />
    </div>
  )
}
