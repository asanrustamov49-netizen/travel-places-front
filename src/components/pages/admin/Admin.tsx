import AdminDashboard from "@/components/widgets/adminDashboard/AdminDashboard";
import scss from "./admin.module.scss";
import AdminPanel from "@/components/widgets/AdminPanel/AdminPanel";

const Admin = () => {
  return (
    <div>
      <AdminDashboard />
      <AdminPanel />
    </div>
  );
};

export default Admin;
