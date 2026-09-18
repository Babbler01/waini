import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">

      <div className="container footer-main">

        <div className="footer-brand">

          <Link
            to="/"
            className="site-logo"
          >
            WAINI
          </Link>

          <p>
            Discover exceptional wines,
            explore new flavours and find
            the perfect bottle for every
            occasion.
          </p>

        </div>

        <div className="footer-links">

          <div>
            <h3>Explore</h3>

            <Link to="/products">
              Our Wines
            </Link>

            <Link to="/assistant">
              Wine Assistant
            </Link>

            <Link to="/about">
              About Waini
            </Link>
          </div>

          <div>
            <h3>Help</h3>

            <Link to="/contact">
              Contact
            </Link>

            <Link to="/cart">
              Your Cart
            </Link>
          </div>

        </div>

      </div>

      <div className="container footer-bottom">

        <p>
          © 2026 Waini. All rights reserved.
        </p>

        <p>
          Please enjoy wine responsibly.
        </p>

      </div>

    </footer>
  );
}

export default Footer;