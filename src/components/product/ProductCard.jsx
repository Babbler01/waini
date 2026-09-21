import { Link } from "react-router-dom";
import "../../styles/product.css";

function ProductCard({ wine }) {
  return (
    <article className="product-card">

      <Link
        to={`/products/${wine.id}`}
        className="product-card-image"
      >
        <img
          src={wine.image}
          alt={wine.name}
        />

        <span className="product-view-label">
          View Wine ↗
        </span>
      </Link>

      <div className="product-card-content">

        <div className="product-card-meta">
          <span>{wine.category}</span>
          <span>{wine.origin}</span>
        </div>

        <Link to={`/products/${wine.id}`}>
          <h3>{wine.name}</h3>
        </Link>

        <div className="product-card-footer">
          <p className="product-card-price">
            ₦{wine.price.toLocaleString()}
          </p>

          <span className="product-card-volume">
            {wine.volume}
          </span>
        </div>

      </div>

    </article>
  );
}

export default ProductCard;