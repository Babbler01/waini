import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cart, cartSubtotal } = useCart();

  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: ""
  });

  const [shippingMethod, setShippingMethod] =
    useState("standard");

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;

    setCustomer((currentCustomer) => ({
      ...currentCustomer,
      [name]: value
    }));
  };

  const shippingFee =
    shippingMethod === "express"
      ? 5000
      : 2500;

  const orderTotal =
    cartSubtotal + shippingFee;

  return (
    <section className="checkout-page">

      <div className="checkout-header">
        <p>CHECKOUT</p>
        <h1>Complete Your Order</h1>
      </div>

      <div className="checkout-content">

        <form className="checkout-form">

          <div className="customer-information">
            <h2>Customer Information</h2>

            <div>
              <label htmlFor="firstName">
                First Name
              </label>

              <input
                id="firstName"
                type="text"
                name="firstName"
                value={customer.firstName}
                onChange={handleCustomerChange}
                required
              />
            </div>

            <div>
              <label htmlFor="lastName">
                Last Name
              </label>

              <input
                id="lastName"
                type="text"
                name="lastName"
                value={customer.lastName}
                onChange={handleCustomerChange}
                required
              />
            </div>

            <div>
              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={customer.email}
                onChange={handleCustomerChange}
                required
              />
            </div>

            <div>
              <label htmlFor="phone">
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                name="phone"
                value={customer.phone}
                onChange={handleCustomerChange}
                required
              />
            </div>

            <div>
              <label htmlFor="address">
                Delivery Address
              </label>

              <input
                id="address"
                type="text"
                name="address"
                value={customer.address}
                onChange={handleCustomerChange}
                required
              />
            </div>

            <div>
              <label htmlFor="city">
                City
              </label>

              <input
                id="city"
                type="text"
                name="city"
                value={customer.city}
                onChange={handleCustomerChange}
                required
              />
            </div>

            <div>
              <label htmlFor="state">
                State
              </label>

              <input
                id="state"
                type="text"
                name="state"
                value={customer.state}
                onChange={handleCustomerChange}
                required
              />
            </div>
          </div>

          <div className="shipping-methods">
            <h2>Shipping Method</h2>

            <label>
              <input
                type="radio"
                name="shipping"
                value="standard"
                checked={shippingMethod === "standard"}
                onChange={(event) =>
                  setShippingMethod(event.target.value)
                }
              />

              <span>
                Standard Delivery — ₦2,500
              </span>
            </label>

            <label>
              <input
                type="radio"
                name="shipping"
                value="express"
                checked={shippingMethod === "express"}
                onChange={(event) =>
                  setShippingMethod(event.target.value)
                }
              />

              <span>
                Express Delivery — ₦5,000
              </span>
            </label>
          </div>

        </form>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>

          <div className="checkout-products">

            {cart.map((item) => (
              <div
                key={item.id}
                className="checkout-product"
              >
                <img
                  src={item.image}
                  alt={item.name}
                />

                <div>
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                </div>

                <p>
                  ₦{(
                    item.price * item.quantity
                  ).toLocaleString()}
                </p>
              </div>
            ))}

          </div>

          <hr />

          <div>
            <span>Subtotal</span>

            <span>
              ₦{cartSubtotal.toLocaleString()}
            </span>
          </div>

          <div>
            <span>Shipping</span>

            <span>
              ₦{shippingFee.toLocaleString()}
            </span>
          </div>

          <hr />

          <div>
            <strong>Total</strong>

            <strong>
              ₦{orderTotal.toLocaleString()}
            </strong>
          </div>

          <Link to="/cart">
            Return to Cart
          </Link>
        </aside>

      </div>

    </section>
  );
}

export default Checkout;