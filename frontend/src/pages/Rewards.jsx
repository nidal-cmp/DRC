import { useAuth } from "../context/AuthContext";

export default function Rewards() {

  const { user } = useAuth();

  const points = user?.points || 0;

  return (

    <div className="reward-page">

      <h1>

        Loyalty Rewards

      </h1>

      <div className="reward-card">

        <h2>

          {points} Points

        </h2>

        <p>

          Earn 1 point for every ₹10 spent

        </p>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width: `${Math.min(points,100)}%`
            }}
          ></div>

        </div>

        <h3>

          Next Reward at 100 Points 🎁

        </h3>

      </div>

    </div>

  );

}