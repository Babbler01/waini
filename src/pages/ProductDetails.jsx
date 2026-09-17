import { Link, useParams } from "react-router-dom";
import wines from "../data/products";
import ProductGrid from "../components/product/ProductGrid";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = wines.find(
    (wine) => wine.id === Number(id)
  );

  if (!product) {
    return (
      <section>
        <h1>Product Not Found</h1>
        <p>The product you are looking for does not exist.</p>
        <Link to="/products">Back to Products</Link>
      </section>
    );
  }

  const relatedProducts = wines
    .filter(
      (wine) =>
        wine.category === product.category &&
        wine.id !== product.id
    )
    .slice(0, 4);

  return (
    <>
      <section className="product-details">
        <div className="product-details-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="product-details-content">
          <p>{product.category}</p>

          <h1>{product.name}</h1>

          <p className="product-price">
            ₦{product.price.toLocaleString()}
          </p>

          <p>{product.description}</p>

          <div className="product-meta">
            <p>
              <strong>Origin:</strong> {product.origin}
            </p>

            <p>
              <strong>Volume:</strong> {product.volume}
            </p>

            <p>
              <strong>Alcohol:</strong> {product.alcohol}
            </p>
          </div>

          <button  type="button" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="related-products">
          <div>
            <p>YOU MAY ALSO LIKE</p>
            <h2>Related Products</h2>
          </div>

          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </>
  );
}

export default ProductDetails;