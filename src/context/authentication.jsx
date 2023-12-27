import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [session, setSession] = useState({
    loading: null,
    error: null,
    user: null,
  });
  const navigate = useNavigate();

  const login = async ({ email, password }) => {
    session.error = null;
    session.loading = true;
    //     signInWithEmailAndPassword(auth, email, password)
    //       .then((userCredential) => {
    //         // Signed in
    //         const user = userCredential.user;
    //         // localStorage.setItem("session", user);
    //         // navigate("/");
    //         console.log(user);
    //       })
    //       .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         // console.log(errorCode, errorMessage);
    //         console.log(error.message);
    //       });
    //     session.loading = false;
  };

  const isAuthenicated = Boolean(localStorage.getItem("session"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    setSession({ ...session, user: null, error: null });
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        login,
        logout,
        isAuthenicated,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuthContext = () => React.useContext(AuthContext);

export { AuthProvider, useAuthContext };
