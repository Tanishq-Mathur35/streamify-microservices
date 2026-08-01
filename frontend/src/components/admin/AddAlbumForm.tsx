import { useState } from 'react'
import type { FormEvent } from 'react'
import Input from '@/components/ui/Input'
import TextArea from '@/components/ui/TextArea'
import FileDrop from '@/components/ui/FileDrop'
import Button from '@/components/ui/Button'
import AdminPanel from '@/components/admin/AdminPanel'
import { useAddAlbum } from '@/hooks/useAdmin'
import { extractErrorMessage } from '@/lib/api'

export default function AddAlbumForm() {
  const addAlbum = useAddAlbum()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!file) return
    addAlbum.mutate(
      { title, description, file },
      {
        onSuccess: () => {
          setTitle('')
          setDescription('')
          setFile(null)
        }
      }
    )
  }

  return (
    <AdminPanel
      eyebrow="Catalog · 01"
      title="Press a new tape"
      description="Add an album shell. You can load tracks into it once it exists."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Album title"
        />
        <TextArea
          label="Description"
          required
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="A line or two about this album"
        />
        <FileDrop label="Cover art" accept="image/*" onChange={setFile} hint="PNG or JPG cover image" />

        {addAlbum.isError && (
          <p className="rounded-lg bg-coral/10 px-3 py-2 text-sm text-coral">
            {extractErrorMessage(addAlbum.error)}
          </p>
        )}
        {addAlbum.isSuccess && (
          <p className="rounded-lg bg-mint/10 px-3 py-2 text-sm text-mint">Album pressed and added to the rack.</p>
        )}

        <Button type="submit" loading={addAlbum.isPending} disabled={!file}>
          Add album
        </Button>
      </form>
    </AdminPanel>
  )
}
