import { Link } from "react-router-dom";
import "../styles/about.css";

function About() {
  return (
    <main className="about-page">

      {/* ========================================
          HERO
      ======================================== */}

      <section className="about-hero">

        <div className="container">

          <div className="about-hero-top">

            <p className="section-label">
              About Waini
            </p>

            <span>
              Wine discovery, reimagined.
            </span>

          </div>


          <div className="about-hero-heading">

            <h1>
              Wine is more
              than a <span>bottle.</span>
            </h1>

          </div>


          <div className="about-hero-bottom">

            <span className="about-hero-number">
              01
            </span>

            <p>
              It's the dinner it accompanies, the people
              around the table, the celebration it marks
              and the memories that remain afterwards.
              Waini makes discovering the right bottle
              for those moments simpler.
            </p>

          </div>

        </div>

      </section>


      {/* ========================================
          BRAND STORY
      ======================================== */}

      <section className="about-story section">

        <div className="container">

          <div className="about-story-grid">

            <div className="about-story-label">

              <p className="section-label">
                Our Perspective
              </p>

              <span>02</span>

            </div>


            <div className="about-story-content">

              <h2>
                Making wine discovery
                <span> less complicated.</span>
              </h2>

              <div className="about-story-copy">

                <p>
                  Choosing wine shouldn't require knowing
                  everything about wine. Sometimes you simply
                  want something that works for dinner, a
                  celebration, a gift or a quiet evening.
                </p>

                <p>
                  Waini brings wine discovery and digital
                  convenience together. Our collection helps
                  you explore bottles by style, origin and
                  price, while Waini Assistant provides
                  additional guidance when you need it.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ========================================
          EDITORIAL IMAGE
      ======================================== */}

      <section className="about-editorial">

        <div className="container">

          <div className="about-editorial-image">

            <img
              src="/images/site/cellar.avif"
              alt="Wine glasses and bottles"
            />

            <div className="about-editorial-overlay">

              <span>
                Waini / Wine Discovery
              </span>

              <p>
                Selected for the moments
                worth remembering.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ========================================
          OUR APPROACH
      ======================================== */}

      <section className="about-approach section">

        <div className="container">

          <div className="about-section-heading">

            <div>

              <p className="section-label">
                Our Approach
              </p>

              <h2>
                Discover wine,
                <span> your way.</span>
              </h2>

            </div>

            <p>
              Waini is designed around a simple idea:
              give people useful ways to explore wine
              without making the experience complicated.
            </p>

          </div>


          <div className="about-approach-grid">

            <article>

              <span>01</span>

              <div className="about-approach-line"></div>

              <h3>Curate.</h3>

              <p>
                Bring together a focused collection of
                wines across different styles, origins
                and price points.
              </p>

            </article>


            <article>

              <span>02</span>

              <div className="about-approach-line"></div>

              <h3>Discover.</h3>

              <p>
                Search, filter and explore the collection
                based on what matters to you.
              </p>

            </article>


            <article>

              <span>03</span>

              <div className="about-approach-line"></div>

              <h3>Enjoy.</h3>

              <p>
                Find the bottle that fits the occasion,
                complete your order and enjoy the moment.
              </p>

            </article>

          </div>

        </div>

      </section>


      {/* ========================================
          WAINI EXPERIENCE
      ======================================== */}

      <section className="about-experience section">

        <div className="container">

          <div className="about-experience-grid">

            <div className="about-experience-intro">

              <p className="section-label">
                The Waini Experience
              </p>

              <h2>
                More than an
                <span> online shelf.</span>
              </h2>

            </div>


            <div className="about-experience-list">

              <article>

                <span>01</span>

                <div>
                  <h3>Explore the Collection</h3>

                  <p>
                    Browse wines by category, price,
                    origin and other useful details.
                  </p>
                </div>

              </article>


              <article>

                <span>02</span>

                <div>
                  <h3>Ask Waini</h3>

                  <p>
                    Use our AI wine assistant for
                    recommendations, pairings and
                    general wine guidance.
                  </p>
                </div>

              </article>


              <article>

                <span>03</span>

                <div>
                  <h3>Shop Seamlessly</h3>

                  <p>
                    Move from discovery to cart and
                    checkout through a simple,
                    connected shopping experience.
                  </p>
                </div>

              </article>


              <article>

                <span>04</span>

                <div>
                  <h3>Choose Your Delivery</h3>

                  <p>
                    Select standard or express delivery
                    depending on what works for you.
                  </p>
                </div>

              </article>

            </div>

          </div>

        </div>

      </section>


      {/* ========================================
          FINAL CTA
      ======================================== */}

      <section className="about-cta">

        <div className="container">

          <div className="about-cta-wrapper">

            <span className="about-cta-number">
              05 / WAINI
            </span>

            <h2>
              Your next favourite
              <span> bottle awaits.</span>
            </h2>

            <p>
              Explore the collection yourself or let
              Waini Assistant help you discover something
              that fits the moment.
            </p>


            <div className="about-cta-actions">

              <Link
                to="/products"
                className="btn btn-primary"
              >
                Explore Wines
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

      </section>

    </main>
  );
}

export default About;