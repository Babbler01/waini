import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import wines from "../data/products";
import ProductGrid from "../components/product/ProductGrid";
import "../styles/products.css";

function Products() {

  // -----------------------------
  // URL + Product Filter States
  // -----------------------------

  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromUrl =
    searchParams.get("category") || "All";

  const [selectedCategory, setSelectedCategory] =
    useState(categoryFromUrl);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [sortOption, setSortOption] =
    useState("default");

  const highestPrice = Math.max(
    ...wines.map((wine) => wine.price)
  );

  const [maxPrice, setMaxPrice] =
    useState(highestPrice);

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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({
        category: category,
      });
    }
  };

  // -----------------------------
  // Reset Filters
  // -----------------------------

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setMaxPrice(highestPrice);
    setSortOption("default");
    setSearchParams({});
  };

  // -----------------------------
  // Page
  // -----------------------------

  return (
    <main className="products-page">

      {/* ========================================
          COLLECTION HERO
      ======================================== */}

      <section className="products-hero">

        <div className="container">

          <div className="products-hero-inner">

            <div>
              <p className="section-label">
                Our Collection
              </p>

              <h1>
                Explore wines for
                <span> every moment.</span>
              </h1>
            </div>

            <div className="products-hero-description">

              <p>
                Discover a curated collection of reds,
                whites, rosés and sparkling wines selected
                for different tastes, occasions and budgets.
              </p>

              <span>
                {wines.length.toString().padStart(2, "0")} wines
                in the collection
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* ========================================
          CATALOGUE
      ======================================== */}

      <section className="products-catalogue">

        <div className="container">

          {/* SEARCH */}

          <div className="catalogue-search">

            <span className="catalogue-search-icon">
              ⌕
            </span>

            <input
              id="product-search"
              type="search"
              placeholder="Search by wine, category or origin..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}

          </div>


          {/* CATEGORY NAVIGATION */}

          <div className="catalogue-categories">

            {categories.map((category) => (

              <button
                key={category}
                type="button"
                className={
                  selectedCategory === category
                    ? "active"
                    : ""
                }
                onClick={() =>
                  handleCategoryChange(category)
                }
              >
                {category}
              </button>

            ))}

          </div>


          {/* CATALOGUE TOOLBAR */}

          <div className="catalogue-toolbar">

            <div className="catalogue-results-info">

              <span>
                {filteredProducts.length
                  .toString()
                  .padStart(2, "0")}
              </span>

              <p>
                {filteredProducts.length === 1
                  ? "wine found"
                  : "wines found"}
              </p>

            </div>


            <div className="catalogue-tools">

              {/* PRICE */}

              <div className="catalogue-price">

                <div className="catalogue-price-label">

                  <span>
                    Maximum price
                  </span>

                  <strong>
                    ₦{maxPrice.toLocaleString()}
                  </strong>

                </div>

                <input
                  id="price"
                  type="range"
                  min="0"
                  max={highestPrice}
                  step="1000"
                  value={maxPrice}
                  onChange={(event) =>
                    setMaxPrice(
                      Number(event.target.value)
                    )
                  }
                />

              </div>


              {/* SORT */}

              <div className="catalogue-sort">

                <label htmlFor="sort">
                  Sort
                </label>

                <select
                  id="sort"
                  value={sortOption}
                  onChange={(event) =>
                    setSortOption(event.target.value)
                  }
                >
                  <option value="default">
                    Featured
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


              <button
                type="button"
                className="catalogue-reset"
                onClick={resetFilters}
              >
                Reset
                <span>↺</span>
              </button>

            </div>

          </div>


          {/* PRODUCTS */}

          <div className="catalogue-products">

            {filteredProducts.length > 0 ? (

              <ProductGrid
                products={filteredProducts}
              />

            ) : (

              <div className="no-products">

                <span>00</span>

                <h2>
                  No wines found.
                </h2>

                <p>
                  We couldn't find a wine matching
                  your current filters. Try adjusting
                  your search, category or price.
                </p>

                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={resetFilters}
                >
                  Reset Filters
                </button>

              </div>

            )}

          </div>

        </div>

      </section>

    </main>
  );
}

export default Products;