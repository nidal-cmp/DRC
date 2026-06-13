import { useAuth } from "../context/AuthContext";

export default function Profile() {

  const { user } = useAuth();

  if (!user) {

    return (

      <div className="page">

        <h1>Please Login</h1>

      </div>

    );

  }

  return (

    <div className="page">

      <h1>My Profile</h1>

      <div className="card-box">

        <h3>
          {user.name}
        </h3>

        <p>
          Email: {user.email}
        </p>

        <p>
          Phone: {user.phone}
        </p>

        <p>
          Loyalty Points: {user.points}
        </p>

      </div>

    </div>

  );

}