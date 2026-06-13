import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="hero">

      <div className="hero-content">

        <p className="hero-tag">
          Restaurant Direct Ordering
        </p>

        <h1>
          Fresh Food,<br />
          Delivered Directly.
        </h1>

        <p className="hero-description">
          Skip third-party commissions and order directly
          from your favourite restaurant.
        </p>

        <Link to="/menu">
          <button className="hero-btn">
            Explore Menu
          </button>
        </Link>

      </div>

    </section>
  );
}