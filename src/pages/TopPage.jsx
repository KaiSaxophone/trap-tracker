import PersonSummaryTable from '../components/people/PersonSummaryTable'

export default function TopPage() {
  return (
    <div>
      <h1 className="page-heading">保有台数一覧</h1>
      <PersonSummaryTable />
    </div>
  )
}
