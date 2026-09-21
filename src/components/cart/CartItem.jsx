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

      {/* IMAGE */}

      <Link
        to={`/products/${item.id}`}
        className="cart-item-image-wrapper"
      >
        <img
          src={item.image}
          alt={item.name}
          className="cart-item-image"
        />
      </Link>


      {/* PRODUCT INFORMATION */}

      <div className="cart-item-details">

        <p className="cart-item-category">
          {item.category}
        </p>

        <Link to={`/products/${item.id}`}>
          <h3>{item.name}</h3>
        </Link>

        <p className="cart-item-price">
          ₦{item.price.toLocaleString()}
          <span> / bottle</span>
        </p>

      </div>


      {/* QUANTITY */}

      <div className="cart-item-quantity-wrapper">

        <span className="cart-item-label">
          Quantity
        </span>

        <div className="cart-item-quantity">

          <button
            type="button"
            onClick={() =>
              decreaseQuantity(item.id)
            }
            aria-label={`Decrease quantity of ${item.name}`}
          >
            −
          </button>

          <span>
            {item.quantity}
          </span>

          <button
            type="button"
            onClick={() =>
              increaseQuantity(item.id)
            }
            aria-label={`Increase quantity of ${item.name}`}
          >
            +
          </button>

        </div>

      </div>


      {/* TOTAL */}

      <div className="cart-item-total">

        <span className="cart-item-label">
          Total
        </span>

        <p>
          ₦{(
            item.price * item.quantity
          ).toLocaleString()}
        </p>

      </div>


      {/* REMOVE */}

      <button
        type="button"
        className="remove-cart-item"
        onClick={() =>
          removeFromCart(item.id)
        }
        aria-label={`Remove ${item.name} from cart`}
      >
        <span>Remove</span>
        <span>×</span>
      </button>

    </article>
  );
}

export default CartItem;