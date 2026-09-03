// Firestore Timestamp を "YYYY/MM/DD HH:mm" 形式の文字列に変換する
export function formatTimestamp(timestamp) {
  if (!timestamp?.toDate) return ''
  const date = timestamp.toDate()
  const pad = (n) => String(n).padStart(2, '0')
  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}
