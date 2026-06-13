import { Link } from "react-router-dom";

export default function Hero() {

  return (

    <section className="hero">

      <div>

        <h1>

          Order Direct.
          <br />
          Save More.

        </h1>

        <p>

          Fresh food delivered straight from
          Restaurant with no middleman.

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