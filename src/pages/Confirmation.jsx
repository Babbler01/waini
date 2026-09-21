import { Link } from "react-router-dom";
import "../styles/confirmation.css";

function Confirmation() {
  const savedOrder =
    sessionStorage.getItem(
      "waini-last-order"
    );

  const order = savedOrder
    ? JSON.parse(savedOrder)
    : null;


  // ========================================
  // NO ORDER
  // ========================================

  if (!order) {
    return (
      <main className="confirmation-page">

        <section className="confirmation-empty">

          <div className="container">

            <div className="confirmation-empty-content">

              <span>00</span>

              <p className="section-label">
                Order
              </p>

              <h1>
                No order
                <span> found.</span>
              </h1>

              <p>
                We couldn't find a recently completed
                order. Explore the collection and find
                your next bottle.
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


  return (
    <main className="confirmation-page">

      {/* ========================================
          SUCCESS HERO
      ======================================== */}

      <section className="confirmation-hero">

        <div className="container">

          <div className="confirmation-status">

            <span className="confirmation-check">
              ✓
            </span>

            <span>
              Payment Successful
            </span>

          </div>


          <div className="confirmation-hero-content">

            <div>

              <p className="section-label">
                Order Confirmed
              </p>

              <h1>
                Thank you for
                <span> your order.</span>
              </h1>

            </div>


            <div className="confirmation-hero-message">

              <p>
                Your payment has been verified and
                your order has been successfully
                received.
              </p>

              <span>
                Reference
              </span>

              <strong>
                {order.reference}
              </strong>

            </div>

          </div>

        </div>

      </section>


      {/* ========================================
          RECEIPT
      ======================================== */}

      <section className="confirmation-main">

        <div className="container">

          <div className="confirmation-layout">


            {/* ====================================
                ORDER INFORMATION
            ==================================== */}

            <div className="confirmation-information">

              <div className="confirmation-section-heading">

                <span>01</span>

                <div>
                  <p className="section-label">
                    Order Information
                  </p>

                  <h2>
                    Your details.
                  </h2>
                </div>

              </div>


              <div className="confirmation-details">

                <div>
                  <span>
                    Customer
                  </span>

                  <strong>
                    {order.customer.firstName}{" "}
                    {order.customer.lastName}
                  </strong>
                </div>


                <div>
                  <span>
                    Email
                  </span>

                  <strong>
                    {order.customer.email}
                  </strong>
                </div>


                <div>
                  <span>
                    Phone
                  </span>

                  <strong>
                    {order.customer.phone}
                  </strong>
                </div>


                <div>
                  <span>
                    Delivery Method
                  </span>

                  <strong>
                    {order.shippingMethod === "express"
                      ? "Express Delivery"
                      : "Standard Delivery"}
                  </strong>
                </div>


                <div className="confirmation-address">
                  <span>
                    Delivery Address
                  </span>

                  <strong>
                    {order.customer.address},{" "}
                    {order.customer.city},{" "}
                    {order.customer.state}
                  </strong>
                </div>

              </div>

            </div>


            {/* ====================================
                RECEIPT SUMMARY
            ==================================== */}

            <aside className="confirmation-receipt">

              <div className="confirmation-receipt-header">

                <div>
                  <p className="section-label">
                    Receipt
                  </p>

                  <h2>
                    Your Order
                  </h2>
                </div>

                <span>
                  {order.items.length
                    .toString()
                    .padStart(2, "0")}
                </span>

              </div>


              {/* PRODUCTS */}

              <div className="confirmation-products">

                {order.items.map((item) => (

                  <div
                    key={item.id}
                    className="confirmation-product"
                  >

                    <div className="confirmation-product-image">

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <span>
                        {item.quantity}
                      </span>

                    </div>


                    <div className="confirmation-product-info">

                      <span>
                        {item.category}
                      </span>

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        ₦{item.price.toLocaleString()}
                        {" "}×{" "}
                        {item.quantity}
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

              <div className="confirmation-summary">

                <div>
                  <span>
                    Subtotal
                  </span>

                  <strong>
                    ₦{order.subtotal.toLocaleString()}
                  </strong>
                </div>


                <div>
                  <span>
                    Shipping
                  </span>

                  <strong>
                    ₦{order.shippingFee.toLocaleString()}
                  </strong>
                </div>

              </div>


              <div className="confirmation-total">

                <div>
                  <span>
                    Total Paid
                  </span>

                  <small>
                    NGN
                  </small>
                </div>

                <strong>
                  ₦{order.total.toLocaleString()}
                </strong>

              </div>


              <div className="confirmation-reference">

                <span>
                  Payment Reference
                </span>

                <strong>
                  {order.reference}
                </strong>

              </div>

            </aside>

          </div>


          {/* ========================================
              NEXT STEP
          ======================================== */}

          <div className="confirmation-next">

            <div>

              <span>
                02
              </span>

              <p>
                Order complete
              </p>

            </div>


            <h2>
              Now, enjoy the
              <span> moment.</span>
            </h2>


            <p>
              Your order has been completed successfully.
              Continue exploring the Waini collection
              whenever you're ready for another bottle.
            </p>


            <Link
              to="/products"
              className="btn btn-primary"
            >
              Continue Shopping
              <span>↗</span>
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Confirmation;