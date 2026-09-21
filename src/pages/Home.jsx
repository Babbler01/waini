import { Link } from "react-router-dom";
import ProductGrid from "../components/product/ProductGrid";
import wines from "../data/products";
import "../styles/home.css";

function Home() {

  const featuredWines = wines
  .filter((wine) => wine.featured)
  .slice(0, 4);

  return (
    <>
      <section className="home-hero">

        <div className="container hero-container">

          <div className="hero-content">

            <p className="section-label"> Curated Wines. Exceptional Moments.</p>
            <h1> Discover Tastes <span> Worth Remembering.</span> </h1>
            <p className="hero-description"> Explore a carefully selected collection of wines from celebrated regions around the world, chosen for every taste, occasion and experience.</p>

            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary">Explore Our Wines</Link>
              <Link to="/assistant" className="btn btn-outline"> Ask Waini Assistant</Link>
            </div>

          </div>

          <div className="hero-visual">

            <div className="hero-image-frame">
              <img src="/images/site/hero.jpg" alt="Premium wine from Waini"/>
            </div>

            <div className="hero-detail">

              <span>01</span>

              <div>
                <p>CURATED COLLECTION</p>
                <strong> Wines selected for every occasion</strong>
              </div>

            </div>

          </div>

        </div>

      </section>



      {/* ========================================
          WINE CATEGORIES
      ======================================== */}

      <section className="wine-categories section">

        <div className="container">

          <div className="categories-heading">
            <div>
              <p className="section-label">
                Explore the Collection
              </p>

              <h2>
                Find your
                <span> perfect pour.</span>
              </h2>
            </div>

            <p className="categories-intro">
              From rich and expressive reds to crisp whites
              and celebratory sparkling wines, discover a
              bottle for every taste and occasion.
            </p>

          </div>


          <div className="categories-grid">

            <Link
              to="/products?category=Red%20Wine"
             className="category-card category-card-red"
            >
              <img
                src="/images/site/red.jpg"
                alt="Red wine"
              />

              <div className="category-overlay"></div>

              <div className="category-content">

                <span className="category-number">
                  01
                </span>

                <div>
                  <h3>Red Wine</h3>
                  <p>Rich · Bold · Expressive</p>
                </div>

                <span className="category-arrow">
                  ↗
                </span>

              </div>
            </Link>


            <Link
              to="/products?category=White%20Wine"
              className="category-card category-card-white"
            >
              <img
                src="/images/site/white.jpg"
                alt="White wine"
              />
              <div className="category-overlay"></div>
              <div className="category-content">
                <span className="category-number">
                  02
                </span>
                <div>
                  <h3>White Wine</h3>
                  <p>Crisp · Fresh · Elegant</p>
                </div>
                <span className="category-arrow">
                  ↗
                </span>

              </div>
            </Link>


            <Link
              to="/products?category=Rose%20Wine"
              className="category-card category-card-rose"
            >
              <img
                src="/images/site/rose.jpg"
                alt="Rosé wine"
              />
              <div className="category-overlay"></div>
              <div className="category-content">
                <span className="category-number">
                  03
                </span>
                <div>
                  <h3>Rosé</h3>
                  <p>Bright · Delicate · Refreshing</p>
                </div>
                <span className="category-arrow">
                  ↗
                </span>
              </div>
            </Link>


            <Link
              to="/products?category=Sparkling%20Wine"
              className="category-card category-card-sparkling"
            >
              <img src="/images/site/spark.jpg" alt="Sparkling wine" />
              <div className="category-overlay"></div>
              <div className="category-content">
                <span className="category-number"> 04</span>
                <div>
                  <h3>Sparkling</h3>
                  <p>Vibrant · Refined · Celebratory</p>
                </div>
                <span className="category-arrow">
                  ↗
                </span>
              </div>
            </Link>

          </div>

        </div>

      </section>


      {/* ========================================
          FEATURED WINES
      ======================================== */}

      <section className="featured-wines section">

        <div className="container">

          <div className="featured-heading">

            <div>
              <p className="section-label">
                Selected for You
              </p>

              <h2>
                Featured
                <span> wines.</span>
              </h2>
            </div>

            <div className="featured-heading-right">

              <p>
                A selection of bottles from the Waini
                collection worth discovering.
              </p>

              <Link
                to="/products"
                className="featured-view-all"
              >
                Explore all wines
                <span>↗</span>
              </Link>

            </div>

          </div>


          <ProductGrid products={featuredWines} />

        </div>

      </section>



      {/* ========================================
          WAINI ASSISTANT FEATURE
      ======================================== */}

      <section className="home-assistant section">

        <div className="container">

          <div className="home-assistant-wrapper">

            <div className="home-assistant-content">

              <p className="section-label">
                Your Digital Sommelier
              </p>

              <h2>
                Not sure what to choose?
                <span> Ask Waini.</span>
              </h2>

              <p className="home-assistant-description">
                Tell Waini what you enjoy, what you're eating,
                your budget or the occasion. Our AI wine assistant
                will help you discover a bottle that fits the moment.
              </p>

              <div className="home-assistant-features">

                <div>
                  <span>01</span>
                  <p>Wine recommendations</p>
                </div>

                <div>
                  <span>02</span>
                  <p>Food pairings</p>
                </div>

                <div>
                  <span>03</span>
                  <p>Budget guidance</p>
                </div>

              </div>

              <Link
                to="/assistant"
                className="btn btn-primary"
              >
                Ask Waini Assistant
                <span>↗</span>
              </Link>

            </div>


            <div className="home-assistant-preview">

              <div className="assistant-preview-window">

                <div className="assistant-preview-header">

                  <div className="assistant-preview-identity">
                    <span className="assistant-preview-dot"></span>

                    <strong>
                      Waini Assistant
                    </strong>
                  </div>

                  <span>
                    AI Wine Guide
                  </span>

                </div>


                <div className="assistant-preview-chat">

                  <div className="preview-message preview-message-user">

                    <span>You</span>

                    <p>
                      I'm having steak tonight.
                      What wine would you recommend?
                    </p>

                  </div>


                  <div className="preview-message preview-message-assistant">

                    <span>Waini Assistant</span>

                    <p>
                      A bold red would be a great match.
                      I'd suggest exploring a Cabernet
                      Sauvignon or another full-bodied red
                      from the Waini collection.
                    </p>

                  </div>


                  <div className="preview-suggestions">

                    <button type="button">
                      Something under ₦20,000
                      <span>↗</span>
                    </button>

                    <button type="button">
                      Show me red wines
                      <span>↗</span>
                    </button>

                  </div>

                </div>


                <div className="assistant-preview-input">

                  <span>
                    Ask Waini about wine...
                  </span>

                  <div>
                    ↗
                  </div>

                </div>

              </div>

              <div className="home-assistant-mark">
                <span>W</span>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ========================================
          WHY WAINI
      ======================================== */}

      <section className="why-waini section">

        <div className="container">

          <div className="why-waini-heading">

            <div>
              <p className="section-label">
                The Waini Experience
              </p>

              <h2>
                Wine discovery,
                <span> made simpler.</span>
              </h2>
            </div>

            <p>
              From discovering the right bottle to completing
              your order, Waini brings together thoughtful
              curation, intelligent guidance and a seamless
              shopping experience.
            </p>

          </div>


          <div className="why-waini-grid">

            <article className="why-waini-card">
              <span className="why-waini-number">01</span>

              <div className="why-waini-icon">
                ◇
              </div>

              <h3>Curated Selection</h3>

              <p>
                A carefully selected collection of wines
                for different tastes, moments and budgets.
              </p>
            </article>


            <article className="why-waini-card">
              <span className="why-waini-number">02</span>

              <div className="why-waini-icon">
                ✦
              </div>

              <h3>AI Wine Guidance</h3>

              <p>
                Get personalised guidance on wines,
                pairings, occasions and budgets with
                Waini Assistant.
              </p>
            </article>


            <article className="why-waini-card">
              <span className="why-waini-number">03</span>

              <div className="why-waini-icon">
                ↗
              </div>

              <h3>Convenient Delivery</h3>

              <p>
                Choose the delivery option that works
                for you and follow a simple checkout
                experience from cart to confirmation.
              </p>
            </article>


            <article className="why-waini-card">
              <span className="why-waini-number">04</span>

              <div className="why-waini-icon">
                ○
              </div>

              <h3>Secure Payments</h3>

              <p>
                Complete your purchase through our
                integrated Paystack payment experience.
              </p>
            </article>

          </div>

        </div>

      </section>



      {/* ========================================
          FINAL CTA
      ======================================== */}

      <section className="home-final-cta">

        <div className="container">

          <div className="final-cta-wrapper">

            <div className="final-cta-mark">
              W
            </div>

            <div className="final-cta-content">

              <p className="section-label">
                Your Next Bottle Awaits
              </p>

              <h2>
                Find a wine worth
                <span> remembering.</span>
              </h2>

              <p>
                Explore the Waini collection or let our
                digital sommelier help you find the right
                bottle for your taste, budget and occasion.
              </p>

              <div className="final-cta-actions">

                <Link
                  to="/products"
                  className="btn btn-primary"
                >
                  Explore Our Wines
                  <span>↗</span>
                </Link>

                <Link
                  to="/assistant"
                  className="btn btn-outline"
                >
                  Ask Waini
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}

export default Home;