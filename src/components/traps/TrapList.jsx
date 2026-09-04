import { useAppData } from '../../contexts/AppDataContext'
import TrapRow from './TrapRow'

export default function TrapList({ traps, selectedIds, onToggleSelect }) {
  const { peopleById } = useAppData()

  return (
    <div className="table-scroll">
      <table className="trap-list">
        <thead>
          <tr>
            <th></th>
            <th>写真</th>
            <th>管理番号</th>
            <th>種類</th>
            <th>サイズ</th>
            <th>所有者</th>
            <th>メモ</th>
            <th>更新日</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {traps.map((trap) => (
            <TrapRow
              key={trap.id}
              trap={trap}
              ownerName={peopleById.get(trap.ownerId)?.name ?? ''}
              selected={selectedIds.has(trap.id)}
              onToggleSelect={onToggleSelect}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
