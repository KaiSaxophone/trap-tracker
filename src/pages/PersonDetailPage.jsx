import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppData } from '../contexts/AppDataContext'
import TrapList from '../components/traps/TrapList'
import MoveTrapsButton from '../components/traps/MoveTrapsButton'

export default function PersonDetailPage() {
  const { personId } = useParams()
  const { peopleById, traps } = useAppData()
  const [selectedIds, setSelectedIds] = useState(new Set())

  const person = peopleById.get(personId)
  const personTraps = traps.filter((trap) => trap.storageLocationId === personId)

  const handleToggleSelect = (trapId) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(trapId)) next.delete(trapId)
      else next.add(trapId)
      return next
    })
  }

  return (
    <div>
      <h1>{person?.name}の保管する罠</h1>
      <MoveTrapsButton
        trapIds={[...selectedIds]}
        onMoved={() => setSelectedIds(new Set())}
      />
      <TrapList
        traps={personTraps}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
      />
    </div>
  )
}
