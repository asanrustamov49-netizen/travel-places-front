"use client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface IJwtPayload {
  id: number;
  email: string;
  exp?: number;
}

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuth(false);
      setUserId(null);
      setIsReady(true);
      return;
    }

    try {
      const decoded = jwtDecode<IJwtPayload>(token);

      if (decoded.exp && decoded.exp * 1000 > Date.now()) {
        setIsAuth(true);
        setUserId(decoded.id);
      } else {
        localStorage.removeItem("token");
        setIsAuth(false);
        setUserId(null);
      }
    } catch {
      localStorage.removeItem("token");
      setIsAuth(false);
      setUserId(null);
    }

    setIsReady(true);
  }, []);

  return {
    isAuth,
    isReady,
    userId,
  };
};
