export default function OrderHistory() {

  return (

    <div className="order-history-page">

      <h1>

        Order History

      </h1>

      <div className="order-card">

        <div className="order-top">

          <h3>

            #1025

          </h3>

          <span className="status delivered">

            Delivered

          </span>

        </div>

        <p>

          Chicken Biryani × 2

        </p>

        <h2>

          ₹360

        </h2>

      </div>

      <div className="order-card">

        <div className="order-top">

          <h3>

            #1024

          </h3>

          <span className="status preparing">

            Preparing

          </span>

        </div>

        <p>

          Paneer Butter Masala × 1

        </p>

        <h2>

          ₹220

        </h2>

      </div>

    </div>

  );

}