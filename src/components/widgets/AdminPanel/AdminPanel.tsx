"use client";

import { useState } from "react";
import scss from "./adminPanel.module.scss";
import PlacesTable from "../placesTable/PlacesTable";
import UsersTable from "../usersTable/UsersTable";
import { useRouter } from "next/navigation";

type TabKey = "places" | "users";

const TABS: { key: TabKey; label: string; count: number }[] = [
  { key: "places", label: "Places", count: 8 },
  { key: "users", label: "Users", count: 8 },
];

const AdminPanel = () => {
  const { push } = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("places");
  const [search, setSearch] = useState("");

  return (
    <section className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          <div className={scss.header}>
            <div className={scss.tabs}>
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  className={`${scss.tab} ${
                    activeTab === tab.key ? scss.tabActive : ""
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                  <span className={scss.tabCount}>{tab.count}</span>
                </button>
              ))}
            </div>

            <div className={scss.actions}>
              <div className={scss.searchWrapper}>
                <svg
                  className={scss.searchIcon}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder={
                    activeTab === "places"
                      ? "Search places..."
                      : "Search users..."
                  }
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={scss.searchInput}
                />
              </div>

              <button
                type="button"
                onClick={() => push("/add")}
                className={scss.createBtn}
              >
                + Create Place
              </button>
            </div>
          </div>

          <div className={scss.content}>
            {activeTab === "places" ? (
              <div>
                <PlacesTable />
              </div>
            ) : (
              <div>
                <UsersTable />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
