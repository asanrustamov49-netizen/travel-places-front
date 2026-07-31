import { Users, Map, Globe, Star } from "lucide-react";

import scss from "./adminDashboard.module.scss";

const stats = [
  {
    id: 1,
    title: "Total Users",
    value: "8",
    icon: Users,
    iconClass: "users",
  },
  {
    id: 2,
    title: "Total Places",
    value: "8",
    icon: Map,
    iconClass: "places",
  },
  {
    id: 3,
    title: "Countries",
    value: "8",
    icon: Globe,
    iconClass: "countries",
  },
  {
    id: 4,
    title: "Avg Rating",
    value: "4.8",
    icon: Star,
    iconClass: "rating",
  },
];

const AdminDashboard = () => {
  return (
    <section className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          <div className={scss.heading}>
            <h1>Admin Dashboard</h1>

            <p>Manage users, places, and platform content.</p>
          </div>

          <div className={scss.stats}>
            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <div className={scss.card} key={item.id}>
                  <div className={`${scss.icon} ${scss[item.iconClass]}`}>
                    <Icon size={25} strokeWidth={2.3} />
                  </div>

                  <div className={scss.info}>
                    <strong>{item.value}</strong>
                    <span>{item.title}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
