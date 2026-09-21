import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import wines from "../data/products";
import ProductGrid from "../components/product/ProductGrid";
import { useCart } from "../context/CartContext";
import "../styles/product-details.css";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  const product = wines.find(
    (wine) => wine.id === Number(id)
  );

  if (!product) {
    return (
      <main className="product-not-found">

        <div className="container">

          <span>404</span>

          <h1>Wine not found.</h1>

          <p> The bottle you're looking for doesn't  appear to be part of our collection.</p>

          <Link
            to="/products"
            className="btn btn-outline"
          >
            Back to Collection
          </Link>

        </div>

      </main>
    );
  }

  const relatedProducts = wines
    .filter(
      (wine) =>
        wine.category === product.category &&
        wine.id !== product.id
    )
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product);

    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  return (
    <main className="product-details-page">

      {/* ========================================
          PRODUCT
      ======================================== */}

      <section className="product-details-section">

        <div className="container">

          <div className="product-breadcrumb">

            <Link to="/products">
              Collection
            </Link>

            <span>/</span>

            <Link
              to={`/products?category=${encodeURIComponent(
                product.category
              )}`}
            >
              {product.category}
            </Link>

            <span>/</span>

            <p>{product.name}</p>

          </div>


          <div className="product-details-layout">

            {/* PRODUCT IMAGE */}

            <div className="product-details-visual">

              <div className="product-details-image">

                <img
                  src={product.image}
                  alt={product.name}
                />

              </div>

            </div>


            {/* PRODUCT INFORMATION */}

            <div className="product-details-content">

              <div className="product-details-heading">

                <p className="section-label">
                  {product.category}
                </p>

                <h1>
                  {product.name}
                </h1>

                <p className="product-details-price">
                  ₦{product.price.toLocaleString()}
                </p>

              </div>


              <p className="product-details-description">
                {product.description}
              </p>


              {/* PRODUCT META */}

              <div className="product-details-meta">

                <div>
                  <span>Origin</span>
                  <strong>
                    {product.origin}
                  </strong>
                </div>

                <div>
                  <span>Volume</span>
                  <strong>
                    {product.volume}
                  </strong>
                </div>

                <div>
                  <span>Alcohol</span>
                  <strong>
                    {product.alcohol}%
                  </strong>
                </div>

              </div>


              {/* CART */}

              <div className="product-purchase">

                <button
                  type="button"
                  className={`product-add-cart ${
                    addedToCart ? "added" : ""
                  }`}
                  onClick={handleAddToCart}
                >

                  <span>
                    {addedToCart
                      ? "Added to Cart"
                      : "Add to Cart"}
                  </span>

                  <span>
                    {addedToCart ? "✓" : "→"}
                  </span>

                </button>


                <Link
                  to="/cart"
                  className="product-view-cart"
                >
                  View Cart
                  <span>↗</span>
                </Link>

              </div>


              <div className="product-service-note">

                <div>
                  <span>01</span>

                  <p>
                    Secure payment
                    through Paystack
                  </p>
                </div>

                <div>
                  <span>02</span>

                  <p>
                    Standard & express
                    delivery available
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ========================================
          RELATED WINES
      ======================================== */}

      {relatedProducts.length > 0 && (

        <section className="related-products section">

          <div className="container">

            <div className="related-products-heading">

              <div>
                <p className="section-label">
                  Continue Exploring
                </p>

                <h2>
                  You may also
                  <span> like.</span>
                </h2>
              </div>


              <Link
                to={`/products?category=${encodeURIComponent(
                  product.category
                )}`}
                className="related-view-all"
              >
                Explore {product.category}
                <span>↗</span>
              </Link>

            </div>


            <ProductGrid
              products={relatedProducts}
            />

          </div>

        </section>

      )}

    </main>
  );
}

export default ProductDetails;