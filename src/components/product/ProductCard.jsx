import { Link } from "react-router-dom";

function ProductCard({ wine }) {
  return (
    <Link
      to={`/products/${wine.id}`}
      className="product-card-link"
    >
      <article className="product-card">
        <img
          src={wine.image}
          alt={wine.name}
          className="product-image"
        />

        <div className="product-info">
          <p className="product-category">
            {wine.category}
          </p>

          <h3>{wine.name}</h3>

          <p className="product-price">
            ₦{wine.price.toLocaleString()}
          </p>
        </div>
      </article>
    </Link>
  );
}

export default ProductCard;