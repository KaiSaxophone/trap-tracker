import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinkClassName = ({ isActive }) =>
    isActive ? 'header__nav-link--active' : undefined

  return (
    <header className="header">
      <div className="header__brand-bar" />
      <div className="header__inner app-container">
        <Link to="/" className="header__title" onClick={() => setMenuOpen(false)}>
          捕獲機ど〜こだ？
        </Link>
        <button
          type="button"
          className="header__toggle"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          menu
        </button>
        <nav className={`header__nav${menuOpen ? ' header__nav--open' : ''}`}>
          <NavLink to="/" end className={navLinkClassName} onClick={() => setMenuOpen(false)}>
            トップ
          </NavLink>
          <NavLink to="/people" className={navLinkClassName} onClick={() => setMenuOpen(false)}>
            人を登録
          </NavLink>
          <NavLink to="/traps/new" className={navLinkClassName} onClick={() => setMenuOpen(false)}>
            捕獲機を登録
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
