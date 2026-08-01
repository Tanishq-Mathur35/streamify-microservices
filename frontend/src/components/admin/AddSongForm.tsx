import { useState } from 'react'
import type { FormEvent } from 'react'
import Input from '@/components/ui/Input'
import TextArea from '@/components/ui/TextArea'
import FileDrop from '@/components/ui/FileDrop'
import Button from '@/components/ui/Button'
import AdminPanel from '@/components/admin/AdminPanel'
import { useAddSong } from '@/hooks/useAdmin'
import { useAlbums } from '@/hooks/useCatalog'
import { extractErrorMessage } from '@/lib/api'

export default function AddSongForm() {
  const { data: albums } = useAlbums()
  const addSong = useAddSong()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [album, setAlbum] = useState('')
  const [file, setFile] = useState<File | null>(null)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!file || !album) return
    addSong.mutate(
      { title, description, album: Number(album), file },
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
      eyebrow="Catalog · 02"
      title="Load a track"
      description="Attach an audio file to an existing tape."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.18em] text-paperdim">
            Album
          </span>
          <select
            required
            value={album}
            onChange={(event) => setAlbum(event.target.value)}
            className="w-full rounded-lg border border-line bg-ink-2 px-3.5 py-2.5 text-sm text-paper focus:border-amber"
          >
            <option value="" disabled>
              Choose a tape
            </option>
            {albums?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </label>

        <Input
          label="Title"
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Track title"
        />
        <TextArea
          label="Description"
          required
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="A line about this track"
        />
        <FileDrop label="Audio file" accept="audio/*" onChange={setFile} hint="MP3 or WAV audio file" />

        {addSong.isError && (
          <p className="rounded-lg bg-coral/10 px-3 py-2 text-sm text-coral">
            {extractErrorMessage(addSong.error)}
          </p>
        )}
        {addSong.isSuccess && (
          <p className="rounded-lg bg-mint/10 px-3 py-2 text-sm text-mint">Track loaded onto the tape.</p>
        )}

        <Button type="submit" loading={addSong.isPending} disabled={!file || !album}>
          Add song
        </Button>
      </form>
    </AdminPanel>
  )
}
