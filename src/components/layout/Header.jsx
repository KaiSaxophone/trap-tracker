import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__title">
        捕獲機ど〜こだ？
      </Link>
      <nav className="header__nav">
        <Link to="/">トップ</Link>
        <Link to="/people">人を管理</Link>
        <Link to="/traps/new">罠を登録</Link>
      </nav>
    </header>
  )
}
