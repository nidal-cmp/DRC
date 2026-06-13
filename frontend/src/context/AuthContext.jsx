import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {

    const savedUser =
      localStorage.getItem("user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;

  });

  useEffect(() => {

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

  }, [user]);

  const login = (userData) => {

    setUser({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      points: userData.points || 0
    });

  };

  const logout = () => {

    setUser(null);

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        setUser
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}

export function useAuth() {

  return useContext(AuthContext);

}