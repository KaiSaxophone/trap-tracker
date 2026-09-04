import { useState } from 'react'
import { useAppData } from '../../contexts/AppDataContext'
import { addPerson, deletePerson, updatePerson } from '../../services/peopleService'
import PersonForm from './PersonForm'

export default function PersonListEditor() {
  const { people, traps } = useAppData()
  const [editingId, setEditingId] = useState(null)

  const handleAdd = async (values) => {
    try {
      await addPerson(values)
    } catch (error) {
      window.alert(`追加に失敗しました: ${error.message}`)
    }
  }

  const handleUpdate = async (id, values) => {
    try {
      await updatePerson(id, values)
      setEditingId(null)
    } catch (error) {
      window.alert(`保存に失敗しました: ${error.message}`)
    }
  }

  const handleDelete = async (id) => {
    const linkedTrapCount = traps.filter(
      (trap) => trap.ownerId === id || trap.storageLocationId === id,
    ).length
    if (linkedTrapCount > 0) {
      window.alert(`この人は${linkedTrapCount}台の捕獲機の所有者または保管者になっているため削除できません。`)
      return
    }
    if (!window.confirm('この人を削除しますか？')) return
    try {
      await deletePerson(id)
    } catch (error) {
      window.alert(`削除に失敗しました: ${error.message}`)
    }
  }

  return (
    <div className="person-list-editor">
      <h2 className="section-heading">人を追加</h2>
      <PersonForm onSubmit={handleAdd} submitLabel="追加" />

      <h2 className="section-heading">人の一覧</h2>
      <ul className="person-list">
        {people.map((person) => (
          <li key={person.id}>
            {editingId === person.id ? (
              <PersonForm
                initialValues={person}
                submitLabel="保存"
                onSubmit={(values) => handleUpdate(person.id, values)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="person-list__row">
                <span className="person-list__name">{person.name}</span>
                <div className="person-list__actions">
                  <button
                    type="button"
                    className="btn btn-secondary btn-small"
                    onClick={() => setEditingId(person.id)}
                  >
                    編集
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-small"
                    onClick={() => handleDelete(person.id)}
                  >
                    削除
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
