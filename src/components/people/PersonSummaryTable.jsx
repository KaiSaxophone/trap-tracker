import { useNavigate } from 'react-router-dom'
import { useAppData } from '../../contexts/AppDataContext'

export default function PersonSummaryTable() {
  const { people, traps } = useAppData()
  const navigate = useNavigate()

  const rows = people.map((person) => ({
    ...person,
    count: traps.filter((trap) => trap.storageLocationId === person.id).length,
  }))

  return (
    <div className="table-scroll">
      <table className="person-summary-table">
        <thead>
          <tr>
            <th>名前</th>
            <th>保管台数</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} onClick={() => navigate(`/people/${row.id}`)}>
              <td>{row.name}</td>
              <td>
                <span className="count-badge">{row.count}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
