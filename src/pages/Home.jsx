import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="home-hero">

        <div className="container hero-container">

          <div className="hero-content">

            <p className="section-label">
              Curated Wines. Exceptional Moments.
            </p>

            <h1>
              Discover Tastes
              <span> Worth Remembering.</span>
            </h1>

            <p className="hero-description">
              Explore a carefully selected collection
              of wines from celebrated regions around
              the world, chosen for every taste,
              occasion and experience.
            </p>

            <div className="hero-actions">

              <Link
                to="/products"
                className="btn btn-primary"
              >
                Explore Our Wines
              </Link>

              <Link
                to="/assistant"
                className="btn btn-outline"
              >
                Ask Waini Assistant
              </Link>

            </div>

          </div>

          <div className="hero-visual">

            <div className="hero-image-frame">

              <img
                src="/images/site/hero.jpg"
                alt="Premium wine from Waini"
              />

            </div>

            <div className="hero-detail">

              <span>01</span>

              <div>
                <p>CURATED COLLECTION</p>
                <strong>
                  Wines selected for every occasion
                </strong>
              </div>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}

export default Home;