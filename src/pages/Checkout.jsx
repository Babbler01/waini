import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PaystackButton } from "react-paystack";

import { useCart } from "../context/CartContext";

function Checkout() {
  const {
    cart,
    cartSubtotal,
    clearCart
  } = useCart();

  const navigate = useNavigate();

  // --------------------------------
  // Customer Information
  // --------------------------------

  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: ""
  });

  // --------------------------------
  // Shipping
  // --------------------------------

    const [shippingMethod, setShippingMethod] =
      useState("standard");

    const [isVerifying, setIsVerifying] =
      useState(false);

    const [paymentError, setPaymentError] =
      useState("");

  

  // --------------------------------
  // Handle Customer Form Changes
  // --------------------------------

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;

    setCustomer((currentCustomer) => ({
      ...currentCustomer,
      [name]: value
    }));
  };

  // --------------------------------
  // Shipping Fee
  // --------------------------------

  const shippingFee =
    shippingMethod === "express"
      ? 5000
      : 2500;

  // --------------------------------
  // Order Total
  // --------------------------------

  const orderTotal =
    cartSubtotal + shippingFee;

  // --------------------------------
  // Paystack Configuration
  // --------------------------------

  const publicKey =
    import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  // Paystack accepts amount in kobo
  const amount = orderTotal * 100;

  // --------------------------------
  // Check Customer Information
  // --------------------------------

  const customerInformationComplete =
    customer.firstName.trim() &&
    customer.lastName.trim() &&
    customer.email.trim() &&
    customer.phone.trim() &&
    customer.address.trim() &&
    customer.city.trim() &&
    customer.state.trim();

  // --------------------------------
  // Paystack Callbacks
  // --------------------------------

  const handlePaystackSuccess = async (reference) => {
    setIsVerifying(true);
    setPaymentError("");

    try {
      console.log(
        "Paystack payment completed:",
        reference
      );

      const response = await fetch(
        "/api/verify-payment",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            reference: reference.reference,
            expectedAmount: amount
          })
        }
      );

      // Read the response as text first
      const responseText = await response.text();

      console.log(
        "Verification response status:",
        response.status
      );

      console.log(
        "Verification response:",
        responseText
      );

      // Make sure the server actually returned something
      if (!responseText) {
        throw new Error(
          "The payment verification server returned an empty response."
        );
      }

      // Now attempt to convert it to JSON
      let verification;

      try {
        verification = JSON.parse(responseText);
      } catch {
        throw new Error(
          "The payment verification server returned an invalid response."
        );
      }

      if (!response.ok || !verification.success) {
        throw new Error(
          verification.message ||
          "Unable to verify payment."
        );
      }

      console.log(
        "Payment verified:",
        verification
      );

      const order = {
        reference:
          verification.payment.reference,

        customer,

        items: cart,

        subtotal: cartSubtotal,

        shippingMethod,

        shippingFee,

        total: orderTotal,

        payment: {
          status:
            verification.payment.status,

          channel:
            verification.payment.channel,

          currency:
            verification.payment.currency,

          paidAt:
            verification.payment.paidAt
        }
      };

      sessionStorage.setItem(
        "winova-last-order",
        JSON.stringify(order)
      );

      clearCart();

      navigate("/confirmation");

    } catch (error) {
      console.error(
        "Payment verification failed:",
        error
      );

      setPaymentError(
        error.message ||
        "We couldn't verify your payment. Please do not make another payment yet."
      );

    } finally {
      setIsVerifying(false);
    }
  };

  const handlePaystackClose = () => {
    console.log(
      "Paystack payment window closed"
    );
  };

  // --------------------------------
  // Paystack Button Configuration
  // --------------------------------

  const paystackConfig = {
    email: customer.email,
    amount,
    publicKey,

    metadata: {
      name: `${customer.firstName} ${customer.lastName}`,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      state: customer.state,
      shippingMethod
    },

    text: `Pay ₦${orderTotal.toLocaleString()}`,

    onSuccess: handlePaystackSuccess,
    onClose: handlePaystackClose
  };

  // --------------------------------
  // Prevent Normal Form Submission
  // --------------------------------

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // --------------------------------
  // Page
  // --------------------------------

  return (
    <section className="checkout-page">

      {/* Checkout Header */}

      <div className="checkout-header">
        <p>CHECKOUT</p>
        <h1>Complete Your Order</h1>
      </div>

      <div className="checkout-content">

        {/* LEFT SIDE */}

        <div className="checkout-left">

          {/* Customer & Shipping Form */}

          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >

            {/* Customer Information */}

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

            {/* Shipping Methods */}

            <div className="shipping-methods">

              <h2>Shipping Method</h2>

              <label>
                <input
                  type="radio"
                  name="shipping"
                  value="standard"
                  checked={
                    shippingMethod === "standard"
                  }
                  onChange={(event) =>
                    setShippingMethod(
                      event.target.value
                    )
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
                  checked={
                    shippingMethod === "express"
                  }
                  onChange={(event) =>
                    setShippingMethod(
                      event.target.value
                    )
                  }
                />

                <span>
                  Express Delivery — ₦5,000
                </span>
              </label>

            </div>

          </form>

          {/* Paystack Button
              Intentionally OUTSIDE the form */}

          <div className="checkout-payment">

            <h2>Payment</h2>

            <p>
              Complete your order securely using Paystack.
            </p>

            {isVerifying ? (
              <div className="payment-verifying">

                <div className="payment-spinner"></div>

                <div>
                  <strong>
                    Verifying Payment...
                  </strong>

                  <p>
                    Please wait while we confirm your
                    payment. Do not close this page.
                  </p>
                </div>

              </div>
            ) : (
              <PaystackButton
                {...paystackConfig}
                className="paystack-button"
                disabled={
                  !customerInformationComplete ||
                  isVerifying
                }
              />
            )}

            {!customerInformationComplete &&
              !isVerifying && (
                <p className="payment-message">
                  Complete your customer information
                  to continue.
                </p>
              )}

            {paymentError && (
              <div className="payment-error">

                <strong>
                  Payment verification issue
                </strong>

                <p>{paymentError}</p>

              </div>
            )}

          </div>

        </div>

        {/* RIGHT SIDE — ORDER SUMMARY */}

        <aside className="checkout-summary">

          <h2>Order Summary</h2>

          {/* Products */}

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

                  <p>
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p>
                  ₦{(
                    item.price *
                    item.quantity
                  ).toLocaleString()}
                </p>

              </div>

            ))}

          </div>

          <hr />

          {/* Subtotal */}

          <div className="summary-row">

            <span>
              Subtotal
            </span>

            <span>
              ₦{cartSubtotal.toLocaleString()}
            </span>

          </div>

          {/* Shipping */}

          <div className="summary-row">

            <span>
              Shipping
            </span>

            <span>
              ₦{shippingFee.toLocaleString()}
            </span>

          </div>

          <hr />

          {/* Total */}

          <div className="summary-row order-total">

            <strong>
              Total
            </strong>

            <strong>
              ₦{orderTotal.toLocaleString()}
            </strong>

          </div>

          {/* Return to Cart */}

          <Link
            to="/cart"
            className="return-to-cart"
          >
            Return to Cart
          </Link>

        </aside>

      </div>

    </section>
  );
}

export default Checkout;