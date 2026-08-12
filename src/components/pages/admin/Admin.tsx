"use client";
import AdminDashboard from "@/components/widgets/adminDashboard/AdminDashboard";
import scss from "./admin.module.scss";
import AdminPanel from "@/components/widgets/AdminPanel/AdminPanel";
import { useGetStatistics } from "@/hooks/functions/useGetStatistics";
import { useAuth } from "@/hooks/functions/auth/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Admin = () => {
  const { isAuth, isReady } = useAuth();
  const { replace } = useRouter();
  const { data: stats, isLoading, isError } = useGetStatistics();

  useEffect(() => {
    if (isReady && !isAuth) replace("/login");
  }, [isAuth, isReady, replace]);

  if (!isReady || !isAuth) return null;

  return (
    <div>
      {isLoading && <p>Loading statistics...</p>}
      {isError && <p>Failed to load statistics.</p>}
      {stats && <AdminDashboard stats={stats} />}
      <AdminPanel />
    </div>
  );
};

export default Admin;
