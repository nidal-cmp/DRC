import { useAuth } from "../context/AuthContext";

export default function Rewards() {

  const { user } = useAuth();

  return (

    <div className="page">

      <h1>Loyalty Rewards</h1>

      <div className="card-box">

        <h2>
          {user?.points || 0} Points
        </h2>

        <p>

          Earn 1 point for every ₹10 spent.

        </p>

      </div>

    </div>

  );

}