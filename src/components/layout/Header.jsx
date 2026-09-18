import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function Header() {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container header-container">

        <Link
          to="/"
          className="site-logo"
          onClick={closeMenu}
        >
          WAINI
        </Link>

        <nav
          className={`main-navigation ${
            menuOpen ? "mobile-menu-open" : ""
          }`}
        >
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/products" onClick={closeMenu}>
            Wines
          </NavLink>

          <NavLink to="/assistant" onClick={closeMenu}>
            Wine Assistant
          </NavLink>

          <NavLink to="/about" onClick={closeMenu}>
            About
          </NavLink>

          <NavLink to="/contact" onClick={closeMenu}>
            Contact
          </NavLink>
        </nav>

        <div className="header-actions">

          <Link
            to="/cart"
            className="header-cart"
            onClick={closeMenu}
          >
            Cart

            <span className="cart-count">
              {cartCount}
            </span>
          </Link>

          <button
            className={`menu-toggle ${
              menuOpen ? "menu-toggle-open" : ""
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
          </button>

        </div>

      </div>
    </header>
  );
}

export default Header;