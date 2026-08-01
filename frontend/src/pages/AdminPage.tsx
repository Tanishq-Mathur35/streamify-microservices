import { ShieldCheck } from 'lucide-react'
import AddAlbumForm from '@/components/admin/AddAlbumForm'
import AddSongForm from '@/components/admin/AddSongForm'
import AddThumbnailForm from '@/components/admin/AddThumbnailForm'
import CatalogManager from '@/components/admin/CatalogManager'

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-3">
          <ShieldCheck size={18} className="text-mint" />
        </span>
        <div>
          <h1 className="font-display text-2xl font-semibold text-paper">Control room</h1>
          <p className="text-sm text-paperdim">Press tapes, load tracks and keep the archive tidy.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AddAlbumForm />
        <AddSongForm />
        <AddThumbnailForm />
        <div className="lg:col-span-2">
          <CatalogManager />
        </div>
      </div>
    </div>
  )
}
