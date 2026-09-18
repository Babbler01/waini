import { Link } from "react-router-dom";

function Confirmation() {
  const savedOrder =
    sessionStorage.getItem(
      "waini-last-order"
    );

  const order = savedOrder
    ? JSON.parse(savedOrder)
    : null;

  if (!order) {
    return (
      <section className="confirmation-page">

        <h1>No Order Found</h1>

        <p>
          We couldn't find a recently
          completed order.
        </p>

        <Link to="/products">
          Explore Wines
        </Link>

      </section>
    );
  }

  return (
    <section className="confirmation-page">

      <div className="confirmation-header">

        <p>PAYMENT SUCCESSFUL</p>

        <h1>Thank You for Your Order</h1>

        <p>
          Your payment was successful and
          your order has been received.
        </p>

      </div>

      <div className="confirmation-content">

        <div className="confirmation-details">

          <h2>Order Details</h2>

          <p>
            <strong>
              Reference:
            </strong>{" "}
            {order.reference}
          </p>

          <p>
            <strong>
              Customer:
            </strong>{" "}
            {order.customer.firstName}{" "}
            {order.customer.lastName}
          </p>

          <p>
            <strong>
              Email:
            </strong>{" "}
            {order.customer.email}
          </p>

          <p>
            <strong>
              Phone:
            </strong>{" "}
            {order.customer.phone}
          </p>

          <p>
            <strong>
              Delivery Address:
            </strong>{" "}
            {order.customer.address},{" "}
            {order.customer.city},{" "}
            {order.customer.state}
          </p>

        </div>

        <div className="confirmation-products">

          <h2>Your Order</h2>

          {order.items.map((item) => (

            <div
              key={item.id}
              className="confirmation-product"
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

        <div className="confirmation-summary">

          <div>
            <span>Subtotal</span>

            <span>
              ₦{order.subtotal.toLocaleString()}
            </span>
          </div>

          <div>
            <span>Shipping</span>

            <span>
              ₦{order.shippingFee.toLocaleString()}
            </span>
          </div>

          <div>
            <span>Total</span>

            <strong>
              ₦{order.total.toLocaleString()}
            </strong>
          </div>

        </div>

      </div>

      <Link
        to="/products"
        className="continue-shopping"
      >
        Continue Shopping
      </Link>

    </section>
  );
}

export default Confirmation;