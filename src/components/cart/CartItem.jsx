import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function CartItem({ item }) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  } = useCart();

  return (
    <article className="cart-item">

      <Link to={`/products/${item.id}`}>
        <img
          src={item.image}
          alt={item.name}
          className="cart-item-image"
        />
      </Link>

      <div className="cart-item-details">
        <p>{item.category}</p>

        <Link to={`/products/${item.id}`}>
          <h3>{item.name}</h3>
        </Link>

        <p>
          ₦{item.price.toLocaleString()}
        </p>
      </div>

      <div className="cart-item-quantity">
        <button
          type="button"
          onClick={() =>
            decreaseQuantity(item.id)
          }
        >
          −
        </button>

        <span>{item.quantity}</span>

        <button
          type="button"
          onClick={() =>
            increaseQuantity(item.id)
          }
        >
          +
        </button>
      </div>

      <div className="cart-item-total">
        <p>
          ₦{(
            item.price * item.quantity
          ).toLocaleString()}
        </p>
      </div>

      <button
        type="button"
        className="remove-cart-item"
        onClick={() =>
          removeFromCart(item.id)
        }
      >
        Remove
      </button>

    </article>
  );
}

export default CartItem;