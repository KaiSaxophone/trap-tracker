import { Link } from 'react-router-dom'
import { getTrapSizeLabel, getTrapTypeLabel } from '../../constants/trapOptions'
import { formatTimestamp } from '../../utils/formatters'

export default function TrapRow({ trap, ownerName, selected, onToggleSelect }) {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggleSelect(trap.id)}
        />
      </td>
      <td>{trap.photoUrl && <img className="trap-thumb" src={trap.photoUrl} alt={trap.trapNumber} />}</td>
      <td>{trap.trapNumber}</td>
      <td>{getTrapTypeLabel(trap.type)}</td>
      <td>{getTrapSizeLabel(trap.size)}</td>
      <td>{ownerName}</td>
      <td>{formatTimestamp(trap.updatedAt)}</td>
      <td>
        <Link to={`/traps/${trap.id}/edit`}>編集</Link>
      </td>
    </tr>
  )
}
