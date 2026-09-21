import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import "../styles/checkout.css";

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
        "waini-last-order",
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
    <main className="checkout-page">

      {/* ========================================
          CHECKOUT HERO
      ======================================== */}

      <section className="checkout-hero">
        <div className="container">

          <div className="checkout-hero-top">
            <p className="section-label">
              Checkout
            </p>

            <span>
              Secure Checkout
            </span>
          </div>

          <div className="checkout-hero-heading">

            <h1>
              Complete your
              <span> order.</span>
            </h1>

            <p>
              Enter your delivery information,
              choose a shipping method and complete
              your payment securely through Paystack.
            </p>

          </div>

        </div>
      </section>


      {/* ========================================
          CHECKOUT CONTENT
      ======================================== */}

      <section className="checkout-main">

        <div className="container">

          <div className="checkout-layout">


            {/* ========================================
                LEFT SIDE
            ======================================== */}

            <div className="checkout-left">

              <form
                className="checkout-form"
                onSubmit={handleSubmit}
              >

                {/* ====================================
                    01 CUSTOMER INFORMATION
                ==================================== */}

                <section className="checkout-section">

                  <div className="checkout-section-heading">

                    <span>01</span>

                    <div>
                      <p className="section-label">
                        Customer Information
                      </p>

                      <h2>
                        Where should we
                        send your wine?
                      </h2>
                    </div>

                  </div>


                  <div className="checkout-fields">

                    <div className="checkout-field">

                      <label htmlFor="firstName">
                        First Name
                      </label>

                      <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        placeholder="Your first name"
                        value={customer.firstName}
                        onChange={handleCustomerChange}
                        required
                      />

                    </div>


                    <div className="checkout-field">

                      <label htmlFor="lastName">
                        Last Name
                      </label>

                      <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        placeholder="Your last name"
                        value={customer.lastName}
                        onChange={handleCustomerChange}
                        required
                      />

                    </div>


                    <div className="checkout-field">

                      <label htmlFor="email">
                        Email Address
                      </label>

                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={customer.email}
                        onChange={handleCustomerChange}
                        required
                      />

                    </div>


                    <div className="checkout-field">

                      <label htmlFor="phone">
                        Phone Number
                      </label>

                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        placeholder="+234"
                        value={customer.phone}
                        onChange={handleCustomerChange}
                        required
                      />

                    </div>


                    <div className="checkout-field checkout-field-full">

                      <label htmlFor="address">
                        Delivery Address
                      </label>

                      <input
                        id="address"
                        type="text"
                        name="address"
                        placeholder="Street address"
                        value={customer.address}
                        onChange={handleCustomerChange}
                        required
                      />

                    </div>


                    <div className="checkout-field">

                      <label htmlFor="city">
                        City
                      </label>

                      <input
                        id="city"
                        type="text"
                        name="city"
                        placeholder="City"
                        value={customer.city}
                        onChange={handleCustomerChange}
                        required
                      />

                    </div>


                    <div className="checkout-field">

                      <label htmlFor="state">
                        State
                      </label>

                      <input
                        id="state"
                        type="text"
                        name="state"
                        placeholder="State"
                        value={customer.state}
                        onChange={handleCustomerChange}
                        required
                      />

                    </div>

                  </div>

                </section>


                {/* ====================================
                    02 SHIPPING
                ==================================== */}

                <section className="checkout-section">

                  <div className="checkout-section-heading">

                    <span>02</span>

                    <div>
                      <p className="section-label">
                        Delivery
                      </p>

                      <h2>
                        Choose your
                        delivery method.
                      </h2>
                    </div>

                  </div>


                  <div className="shipping-options">

                    <label
                      className={`shipping-option ${
                        shippingMethod === "standard"
                          ? "selected"
                          : ""
                      }`}
                    >

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

                      <span className="shipping-radio"></span>

                      <div className="shipping-option-content">

                        <div>
                          <strong>
                            Standard Delivery
                          </strong>

                          <p>
                            Standard delivery service
                            for your order.
                          </p>
                        </div>

                        <strong className="shipping-price">
                          ₦2,500
                        </strong>

                      </div>

                    </label>


                    <label
                      className={`shipping-option ${
                        shippingMethod === "express"
                          ? "selected"
                          : ""
                      }`}
                    >

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

                      <span className="shipping-radio"></span>

                      <div className="shipping-option-content">

                        <div>
                          <strong>
                            Express Delivery
                          </strong>

                          <p>
                            Faster delivery when you
                            need your order sooner.
                          </p>
                        </div>

                        <strong className="shipping-price">
                          ₦5,000
                        </strong>

                      </div>

                    </label>

                  </div>

                </section>

              </form>


              {/* ====================================
                  03 PAYMENT
              ==================================== */}

              <section className="checkout-section checkout-payment-section">

                <div className="checkout-section-heading">

                  <span>03</span>

                  <div>
                    <p className="section-label">
                      Payment
                    </p>

                    <h2>
                      Secure your
                      order.
                    </h2>
                  </div>

                </div>


                <div className="checkout-payment">

                  <div className="payment-intro">

                    <div>
                      <span className="payment-lock">
                        ◇
                      </span>

                      <div>
                        <strong>
                          Secure Payment
                        </strong>

                        <p>
                          Payment is processed securely
                          through Paystack.
                        </p>
                      </div>
                    </div>

                    <span>
                      PAYSTACK
                    </span>

                  </div>


                  {isVerifying ? (

                    <div className="payment-verifying">

                      <div className="payment-spinner"></div>

                      <div>
                        <strong>
                          Verifying Payment...
                        </strong>

                        <p>
                          Please wait while we confirm
                          your payment. Do not close
                          this page.
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
                        Complete all customer information
                        above to enable payment.
                      </p>

                    )}


                  {paymentError && (

                    <div className="payment-error">

                      <strong>
                        Payment verification issue
                      </strong>

                      <p>
                        {paymentError}
                      </p>

                    </div>

                  )}

                </div>

              </section>

            </div>


            {/* ========================================
                ORDER SUMMARY
            ======================================== */}

            <aside className="checkout-summary">

              <div className="checkout-summary-heading">

                <div>
                  <p className="section-label">
                    Your Order
                  </p>

                  <h2>
                    Order Summary
                  </h2>
                </div>

                <span>
                  {cart.length
                    .toString()
                    .padStart(2, "0")}
                </span>

              </div>


              {/* PRODUCTS */}

              <div className="checkout-products">

                {cart.map((item) => (

                  <div
                    key={item.id}
                    className="checkout-product"
                  >

                    <Link
                      to={`/products/${item.id}`}
                      className="checkout-product-image"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <span>
                        {item.quantity}
                      </span>
                    </Link>


                    <div className="checkout-product-details">

                      <span>
                        {item.category}
                      </span>

                      <Link
                        to={`/products/${item.id}`}
                      >
                        <h3>
                          {item.name}
                        </h3>
                      </Link>

                      <p>
                        Qty. {item.quantity}
                      </p>

                    </div>


                    <strong>
                      ₦{(
                        item.price *
                        item.quantity
                      ).toLocaleString()}
                    </strong>

                  </div>

                ))}

              </div>


              {/* TOTALS */}

              <div className="checkout-summary-totals">

                <div>
                  <span>
                    Subtotal
                  </span>

                  <strong>
                    ₦{cartSubtotal.toLocaleString()}
                  </strong>
                </div>


                <div>
                  <span>
                    Shipping
                  </span>

                  <strong>
                    ₦{shippingFee.toLocaleString()}
                  </strong>
                </div>

              </div>


              <div className="checkout-total">

                <div>
                  <span>
                    Total
                  </span>

                  <small>
                    NGN
                  </small>
                </div>

                <strong>
                  ₦{orderTotal.toLocaleString()}
                </strong>

              </div>


              <Link
                to="/cart"
                className="return-to-cart"
              >
                <span>←</span>
                Return to Cart
              </Link>


              <div className="checkout-summary-footer">

                <span>Secure</span>
                <span>•</span>
                <span>Paystack</span>
                <span>•</span>
                <span>NGN</span>

              </div>

            </aside>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Checkout;