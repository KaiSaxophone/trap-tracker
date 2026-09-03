import { useState } from 'react'

export default function PersonForm({ initialValues, onSubmit, onCancel, submitLabel }) {
  const [name, setName] = useState(initialValues?.name ?? '')
  const [memo, setMemo] = useState(initialValues?.memo ?? '')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ name, memo })
  }

  return (
    <form className="person-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="名前"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="メモ"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />
      <button type="submit">{submitLabel}</button>
      {onCancel && (
        <button type="button" onClick={onCancel}>
          キャンセル
        </button>
      )}
    </form>
  )
}
