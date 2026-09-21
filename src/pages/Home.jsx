import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
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
    </>
  );
}

export default Home;