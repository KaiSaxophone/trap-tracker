import { useState } from 'react'
import { TRAP_SIZES, TRAP_TYPES } from '../../constants/trapOptions'
import { useAppData } from '../../contexts/AppDataContext'
import TrapPhotoUploader from './TrapPhotoUploader'

export default function TrapForm({ initialValues, onSubmit, submitLabel, submitting, errorMessage }) {
  const { people } = useAppData()
  const [type, setType] = useState(initialValues?.type ?? TRAP_TYPES[0].value)
  const [size, setSize] = useState(initialValues?.size ?? TRAP_SIZES[0].value)
  const [trapNumber, setTrapNumber] = useState(initialValues?.trapNumber ?? '')
  const [ownerId, setOwnerId] = useState(initialValues?.ownerId ?? '')
  const [storageLocationId, setStorageLocationId] = useState(
    initialValues?.storageLocationId ?? '',
  )
  const [photoFile, setPhotoFile] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ type, size, trapNumber, ownerId, storageLocationId }, photoFile)
  }

  return (
    <form className="trap-form" onSubmit={handleSubmit}>
      <label>
        種類
        <select value={type} onChange={(e) => setType(e.target.value)}>
          {TRAP_TYPES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        サイズ
        <select value={size} onChange={(e) => setSize(e.target.value)}>
          {TRAP_SIZES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        管理番号
        <input
          type="text"
          value={trapNumber}
          onChange={(e) => setTrapNumber(e.target.value)}
          required
        />
      </label>

      <label>
        所有者
        <select value={ownerId} onChange={(e) => setOwnerId(e.target.value)} required>
          <option value="" disabled>
            選択してください
          </option>
          {people.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        現在の保管場所
        <select
          value={storageLocationId}
          onChange={(e) => setStorageLocationId(e.target.value)}
          required
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
      </label>

      <TrapPhotoUploader
        file={photoFile}
        onChange={setPhotoFile}
        existingPhotoUrl={initialValues?.photoUrl}
      />

      {errorMessage && <p className="form-error">{errorMessage}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? '処理中...' : submitLabel}
      </button>
    </form>
  )
}
