import { Outlet } from 'react-router-dom'
import TopBar from '@/components/layout/TopBar'
import PlayerConsole from '@/components/player/PlayerConsole'
import { usePlayerStore } from '@/store/playerStore'

export default function AppShell() {
  const hasActiveSong = usePlayerStore((state) => state.currentIndex >= 0)

  return (
    <div className="grain min-h-screen">
      <TopBar />
      <main className={hasActiveSong ? 'pb-28' : 'pb-10'}>
        <Outlet />
      </main>
      <PlayerConsole />
    </div>
  )
}
