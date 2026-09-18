import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function Header() {

  const { cartCount } = useCart();

  return (
    <header>
      <Link to="/">
        <h2>Winova</h2>
      </Link>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/assistant">FAQ</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/cart">
          Cart ({cartCount})
        </Link>
      </nav>
    </header>
  );
}

export default Header;