import { useState } from 'react'

export default function PersonForm({ initialValues, onSubmit, onCancel, submitLabel }) {
  const [name, setName] = useState(initialValues?.name ?? '')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ name })
  }

  return (
    <form className="person-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        placeholder="名前"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            キャンセル
          </button>
        )}
      </div>
    </form>
  )
}
