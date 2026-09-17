import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
  return (
    <div className="products-grid">
      {products.map((wine) => (
        <ProductCard
          key={wine.id}
          wine={wine}
        />
      ))}
    </div>
  );
}

export default ProductGrid;