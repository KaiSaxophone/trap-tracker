export default function FirebaseSetupNotice() {
  return (
    <div className="setup-notice">
      <h1>Firebaseが未設定です</h1>
      <p>
        このアプリを動かすには Firebase プロジェクトを作成し、設定値を{' '}
        <code>.env.local</code> に記入する必要があります。手順は{' '}
        <code>README.md</code> を参照してください。
      </p>
    </div>
  )
}
