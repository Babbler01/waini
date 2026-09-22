import { Link } from "react-router-dom";
import "../styles/not-found.css";

function NotFound() {
  return (
    <main className="not-found-page">

      <div className="container">

        <div className="not-found-content">

          {/* ERROR NUMBER */}

          <div className="not-found-number">
            <span>4</span>
            
            <span className="not-found-zero">0</span>

            <span>4</span>
          </div>


          {/* CONTENT */}

          <p className="section-label">
            Page Not Found
          </p>

          <h1>
            A wrong turn
            <span> in the cellar.</span>
          </h1>

          <p className="not-found-description">
            The page you're looking for may have
            moved, disappeared, or never existed.
            There's still plenty worth discovering.
          </p>


          {/* ACTIONS */}

          <div className="not-found-actions">

            <Link
              to="/products"
              className="btn btn-primary"
            >
              Explore Wines
              <span>↗</span>
            </Link>

            <Link
              to="/"
              className="btn btn-outline"
            >
              Go Home
            </Link>

          </div>


          {/* ASSISTANT */}

          <div className="not-found-assistant">

            <span>
              Looking for a bottle?
            </span>

            <Link to="/assistant">
              Ask Waini
              <span>↗</span>
            </Link>

          </div>

        </div>

      </div>


      {/* DECORATIVE BACKGROUND */}

      <span
        className="not-found-background"
        aria-hidden="true"
      >
        W
      </span>

    </main>
  );
}

export default NotFound;