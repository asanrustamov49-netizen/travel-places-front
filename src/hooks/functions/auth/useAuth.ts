"use client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuth(false);
      return;
    }

    try {
      const decoded: { exp?: number } = jwtDecode(token);

      if (decoded.exp && decoded.exp * 1000 > Date.now()) {
        setIsAuth(true);
      } else {
        localStorage.removeItem("token");
        setIsAuth(false);
      }
    } catch {
      localStorage.removeItem("token");
      setIsAuth(false);
    }
  }, []);

  return {
    isAuth,
  };
};
