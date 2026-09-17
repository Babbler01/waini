import { useState } from "react";
import wines from "../data/products";
import ProductGrid from "../components/product/ProductGrid";

function Products() {
  // -----------------------------
  // Product Filter States
  // -----------------------------

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");

  // Find the most expensive wine automatically
  const highestPrice = Math.max(
    ...wines.map((wine) => wine.price)
  );

  const [maxPrice, setMaxPrice] = useState(highestPrice);

  // -----------------------------
  // Generate Product Categories
  // -----------------------------

  const categories = [
    "All",
    ...new Set(wines.map((wine) => wine.category)),
  ];

  // -----------------------------
  // Filter Products
  // -----------------------------

  let filteredProducts = wines.filter((wine) => {
    // Category filter
    const matchesCategory =
      selectedCategory === "All" ||
      wine.category === selectedCategory;

    // Search filter
    const search = searchTerm.trim().toLowerCase();

    const matchesSearch =
      wine.name.toLowerCase().includes(search) ||
      wine.category.toLowerCase().includes(search) ||
      wine.origin.toLowerCase().includes(search);

    // Price filter
    const matchesPrice = wine.price <= maxPrice;

    return (
      matchesCategory &&
      matchesSearch &&
      matchesPrice
    );
  });

  // -----------------------------
  // Sort Products
  // -----------------------------

  if (sortOption === "price-low") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    );
  }

  if (sortOption === "price-high") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    );
  }

  if (sortOption === "name") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.name.localeCompare(b.name)
    );
  }

  // -----------------------------
  // Reset Filters
  // -----------------------------

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setMaxPrice(highestPrice);
    setSortOption("default");
  };

  // -----------------------------
  // Page
  // -----------------------------

  return (
    <section className="products-page">

      {/* Page Heading */}

      <div className="products-header">
        <p>OUR COLLECTION</p>

        <h1>Explore Our Wines</h1>

        <p>
          Discover our collection of carefully selected wines.
        </p>
      </div>

      {/* Product Controls */}

      <div className="product-controls">

        {/* Search */}

        <div className="product-search">
          <label htmlFor="product-search">
            Search
          </label>

          <input
            id="product-search"
            type="search"
            placeholder="Search wines..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />
        </div>

        {/* Categories */}

        <div className="product-filters">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() =>
                setSelectedCategory(category)
              }
            >
              {category}
            </button>
          ))}
        </div>

        {/* Price Filter */}

        <div className="price-filter">
          <label htmlFor="price">
            Maximum Price: ₦{maxPrice.toLocaleString()}
          </label>

          <input
            id="price"
            type="range"
            min="0"
            max={highestPrice}
            step="1000"
            value={maxPrice}
            onChange={(event) =>
              setMaxPrice(Number(event.target.value))
            }
          />
        </div>

        {/* Sort */}

        <div className="sort-products">
          <label htmlFor="sort">
            Sort by:
          </label>

          <select
            id="sort"
            value={sortOption}
            onChange={(event) =>
              setSortOption(event.target.value)
            }
          >
            <option value="default">
              Default
            </option>

            <option value="price-low">
              Price: Low to High
            </option>

            <option value="price-high">
              Price: High to Low
            </option>

            <option value="name">
              Name: A–Z
            </option>
          </select>
        </div>

        {/* Reset */}

        <button
          type="button"
          className="reset-filters"
          onClick={resetFilters}
        >
          Reset Filters
        </button>

      </div>

      {/* Product Results */}

      <div className="products-results">

        <p className="product-count">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1
            ? "product"
            : "products"}{" "}
          found
        </p>

        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="no-products">
            <h3>No wines found</h3>

            <p>
              Try changing your search, category,
              or maximum price.
            </p>

            <button
              type="button"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

    </section>
  );
}

export default Products;