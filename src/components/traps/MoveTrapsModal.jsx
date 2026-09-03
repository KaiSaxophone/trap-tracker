import { useState } from 'react'
import { useAppData } from '../../contexts/AppDataContext'
import { moveTraps } from '../../services/trapsService'

export default function MoveTrapsModal({ trapIds, onClose, onMoved }) {
  const { people } = useAppData()
  const [newPersonId, setNewPersonId] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleConfirm = async () => {
    if (!newPersonId) return
    setSubmitting(true)
    try {
      await moveTraps(trapIds, newPersonId)
      onMoved()
    } catch (error) {
      window.alert(`移動に失敗しました: ${error.message}`)
      setSubmitting(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>移動先を選択</h2>
        <select
          className="select"
          value={newPersonId}
          onChange={(e) => setNewPersonId(e.target.value)}
        >
          <option value="" disabled>
            選択してください
          </option>
          {people.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </select>
        <div className="modal__actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleConfirm}
            disabled={submitting}
          >
            {submitting ? '移動中...' : '移動する'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={submitting}
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  )
}
