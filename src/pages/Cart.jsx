import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/cart/CartItem";
import "../styles/cart.css";

function Cart() {
  const {
    cart,
    cartCount,
    cartSubtotal,
    clearCart
  } = useCart();


  // ========================================
  // EMPTY CART
  // ========================================

  if (cart.length === 0) {
    return (
      <main className="cart-page">

        <section className="empty-cart">

          <div className="container">

            <div className="empty-cart-content">

              <span className="empty-cart-number">
                00
              </span>

              <p className="section-label">
                Your Selection
              </p>

              <h1>
                Your cart is
                <span> empty.</span>
              </h1>

              <p className="empty-cart-description">
                Your next bottle is waiting somewhere
                in the collection. Explore our wines
                and find something worth remembering.
              </p>

              <Link
                to="/products"
                className="btn btn-primary"
              >
                Explore Wines
                <span>↗</span>
              </Link>

            </div>

          </div>

        </section>

      </main>
    );
  }


  // ========================================
  // CART
  // ========================================

  return (
    <main className="cart-page">

      {/* ========================================
          CART HEADER
      ======================================== */}

      <section className="cart-hero">

        <div className="container">

          <div className="cart-hero-top">

            <p className="section-label">
              Your Selection
            </p>

            <span>
              {cartCount.toString().padStart(2, "0")}{" "}
              {cartCount === 1 ? "item" : "items"}
            </span>

          </div>


          <div className="cart-hero-heading">

            <h1>
              Shopping
              <span> cart.</span>
            </h1>

            <p>
              Review your selected wines before
              continuing to checkout.
            </p>

          </div>

        </div>

      </section>


      {/* ========================================
          CART CONTENT
      ======================================== */}

      <section className="cart-main">

        <div className="container">

          <div className="cart-layout">


            {/* ========================================
                CART ITEMS
            ======================================== */}

            <div className="cart-products">

              <div className="cart-products-header">

                <span>
                  Your Wines
                </span>

                <button
                  type="button"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>

              </div>


              <div className="cart-items">

                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                  />
                ))}

              </div>


              <div className="cart-continue">

                <Link to="/products">
                  <span>←</span>
                  Continue Shopping
                </Link>

              </div>

            </div>


            {/* ========================================
                ORDER SUMMARY
            ======================================== */}

            <aside className="cart-summary">

              <div className="cart-summary-heading">

                <p className="section-label">
                  Order Summary
                </p>

                <span>
                  {cartCount.toString().padStart(2, "0")}
                </span>

              </div>


              <div className="cart-summary-details">

                <div className="cart-summary-row">

                  <span>
                    Subtotal
                  </span>

                  <strong>
                    ₦{cartSubtotal.toLocaleString()}
                  </strong>

                </div>


                <div className="cart-summary-row">

                  <span>
                    Shipping
                  </span>

                  <p>
                    Calculated at checkout
                  </p>

                </div>

              </div>


              <div className="cart-summary-total">

                <span>
                  Current Total
                </span>

                <strong>
                  ₦{cartSubtotal.toLocaleString()}
                </strong>

              </div>


              <Link
                to="/checkout"
                className="cart-checkout-button"
              >
                <span>
                  Proceed to Checkout
                </span>

                <span>→</span>
              </Link>


              <div className="cart-summary-notes">

                <div>
                  <span>01</span>

                  <p>
                    Secure payment powered by Paystack
                  </p>
                </div>

                <div>
                  <span>02</span>

                  <p>
                    Standard and express delivery available
                  </p>
                </div>

              </div>

            </aside>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Cart;