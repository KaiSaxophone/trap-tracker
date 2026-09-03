import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TrapForm from '../components/traps/TrapForm'
import { createTrap } from '../services/trapsService'

export default function TrapNewPage() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = async (fields, photoFile) => {
    setSubmitting(true)
    setErrorMessage(null)
    try {
      await createTrap(fields, photoFile)
      navigate('/')
    } catch (error) {
      setErrorMessage(`登録に失敗しました: ${error.message}`)
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="page-heading">罠を登録</h1>
      <TrapForm
        onSubmit={handleSubmit}
        submitLabel="登録"
        submitting={submitting}
        errorMessage={errorMessage}
      />
    </div>
  )
}
