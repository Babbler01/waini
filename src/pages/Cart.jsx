import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/cart/CartItem";

function Cart() {
  const {
    cart,
    cartCount,
    cartSubtotal,
    clearCart
  } = useCart();

  if (cart.length === 0) {
    return (
      <section className="cart-page empty-cart">
        <h1>Your Cart</h1>

        <h2>Your cart is empty</h2>

        <p>
          You haven't added any wines to your
          cart yet.
        </p>

        <Link to="/products">
          Explore Wines
        </Link>
      </section>
    );
  }

  return (
    <section className="cart-page">

      <div className="cart-header">
        <div>
          <p>YOUR SELECTION</p>
          <h1>Shopping Cart</h1>

          <p>
            {cartCount}{" "}
            {cartCount === 1 ? "item" : "items"}
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
        >
          Clear Cart
        </button>
      </div>

      <div className="cart-content">

        {/* Cart Products */}

        <div className="cart-items">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
            />
          ))}
        </div>

        {/* Order Summary */}

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div>
            <span>Subtotal</span>

            <span>
              ₦{cartSubtotal.toLocaleString()}
            </span>
          </div>

          <div>
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>

          <hr />

          <div>
            <strong>Total</strong>

            <strong>
              ₦{cartSubtotal.toLocaleString()}
            </strong>
          </div>

          <Link to="/checkout">
            Proceed to Checkout
          </Link>

          <Link to="/products">
            Continue Shopping
          </Link>
        </aside>

      </div>

    </section>
  );
}

export default Cart;