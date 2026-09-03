import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppData } from '../contexts/AppDataContext'
import TrapForm from '../components/traps/TrapForm'
import { deleteTrap, updateTrap } from '../services/trapsService'

export default function TrapEditPage() {
  const { trapId } = useParams()
  const navigate = useNavigate()
  const { traps } = useAppData()
  const trap = traps.find((t) => t.id === trapId)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = async (fields, photoFile) => {
    setSubmitting(true)
    setErrorMessage(null)
    try {
      await updateTrap(
        trapId,
        { ...fields, photoUrl: trap.photoUrl, photoStoragePath: trap.photoStoragePath },
        photoFile,
      )
      navigate('/')
    } catch (error) {
      setErrorMessage(`保存に失敗しました: ${error.message}`)
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('この罠を削除しますか？')) return
    try {
      await deleteTrap(trapId, trap.photoStoragePath)
      navigate('/')
    } catch (error) {
      window.alert(`削除に失敗しました: ${error.message}`)
    }
  }

  if (!trap) return null

  return (
    <div>
      <h1>罠を編集</h1>
      <TrapForm
        initialValues={trap}
        onSubmit={handleSubmit}
        submitLabel="保存"
        submitting={submitting}
        errorMessage={errorMessage}
      />
      <button type="button" onClick={handleDelete}>
        この罠を削除
      </button>
    </div>
  )
}
