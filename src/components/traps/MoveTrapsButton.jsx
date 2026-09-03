import { useState } from 'react'
import MoveTrapsModal from './MoveTrapsModal'

export default function MoveTrapsButton({ trapIds, onMoved }) {
  const [modalOpen, setModalOpen] = useState(false)

  const handleMoved = () => {
    setModalOpen(false)
    onMoved()
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        disabled={trapIds.length === 0}
        onClick={() => setModalOpen(true)}
      >
        選択した罠を移動
      </button>
      {modalOpen && (
        <MoveTrapsModal
          trapIds={trapIds}
          onClose={() => setModalOpen(false)}
          onMoved={handleMoved}
        />
      )}
    </>
  )
}
