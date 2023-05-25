import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }
    if (response.ok) {
      //save the use to local storage
      localStorage.setItem("user", JSON.stringify(data));

      //update Auth context
      dispatch({ type: "LOGIN", payload: data });

      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

export default useLogin;
