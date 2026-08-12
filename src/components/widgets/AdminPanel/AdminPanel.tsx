"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import scss from "./adminPanel.module.scss";
import PlacesTable from "../placesTable/PlacesTable";
import UsersTable from "../usersTable/UsersTable";
import { useGetPlaces } from "../../../hooks/functions/places/useGetPlaces";
import { useGetUsers } from "../../../hooks/functions/users/useGetUsers";
import { TSort, TypeSort } from "@/hooks/types/placesTypes";

type TabKey = "places" | "users";
const CATEGORIES = ["All", "Beach", "Culture", "Adventure", "Nature", "City"];
const TABS: { key: TabKey; label: string }[] = [
  {
    key: "places",
    label: "Places",
  },
  {
    key: "users",
    label: "Users",
  },
];

const AdminPanel = () => {
  const { push } = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("places");
  const [type, setType] = useState<TypeSort>("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<TSort>("newest");
  const [page, setPage] = useState(1);
  const limit = 6;
  const {
    data: placesData,
    isLoading: placesLoading,
    isError: placesError,
  } = useGetPlaces({
    page,
    limit,
    type: type === "All" ? undefined : type,
    search: search || undefined,
    sort,
  });
  const places = placesData?.data ?? [];
  const totalPlaces = placesData?.pagination?.total ?? 0;
  const placesTotalPages = placesData?.pagination?.pages ?? 1;

  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError,
  } = useGetUsers({
    page,
    limit,
    search: search || undefined,
  });
  const users = usersData?.data ?? [];
  const totalUsers = usersData?.pagination?.total ?? 0;
  const usersTotalPages = usersData?.pagination?.pages ?? 1;

  const totalPages =
    activeTab === "places" ? placesTotalPages : usersTotalPages;

  useEffect(() => {
    setPage(1);
  }, [type, search, sort, activeTab]);
  return (
    <section className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          <div className={scss.header}>
            <div>
              <h1>Admin Panel</h1>
              <p>Manage destinations and users.</p>
            </div>
            <div className={scss.tabs}>
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  className={`${scss.tab} ${
                    activeTab === tab.key ? scss.tabActive : ""
                  }`}
                  onClick={() => {
                    setActiveTab(tab.key);
                    setPage(1);
                  }}
                >
                  {tab.label}

                  <span className={scss.tabCount}>
                    {tab.key === "places" ? totalPlaces : totalUsers}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className={scss.controls}>
            <input
              type="text"
              placeholder={
                activeTab === "places" ? "Search places..." : "Search users..."
              }
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className={scss.searchInput}
            />
            {activeTab === "places" && (
              <>
                <select
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value as TypeSort);
                    setPage(1);
                  }}
                  className={scss.select}
                >
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value as TSort);
                    setPage(1);
                  }}
                  className={scss.select}
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low → High</option>
                  <option value="price-high">Price: High → Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="alphabetical">A → Z</option>
                </select>
                <button
                  type="button"
                  onClick={() => push("/add")}
                  className={scss.createBtn}
                >
                  + Create Place
                </button>
              </>
            )}
          </div>
          <div className={scss.content}>
            {activeTab === "places" ? (
              <>
                {placesLoading && (
                  <div className={scss.message}>Loading places...</div>
                )}
                {placesError && (
                  <div className={scss.message}>Failed to load places.</div>
                )}
                {!placesLoading && !placesError && places.length === 0 && (
                  <div className={scss.message}>No places found.</div>
                )}
                {!placesLoading && !placesError && places.length > 0 && (
                  <PlacesTable places={places} />
                )}
              </>
            ) : (
              <>
                {usersLoading && (
                  <div className={scss.message}>Loading users...</div>
                )}
                {usersError && (
                  <div className={scss.message}>Failed to load users.</div>
                )}
                {!usersLoading && !usersError && users.length === 0 && (
                  <div className={scss.message}>No users found.</div>
                )}
                {!usersLoading && !usersError && users.length > 0 && (
                  <UsersTable users={users} />
                )}
              </>
            )}
          </div>
          {totalPages > 1 && (
            <div className={scss.pagination}>
              <button
                type="button"
                className={scss.pageArrow}
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              >
                <ChevronLeft size={15} />
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    className={
                      page === pageNumber ? scss.pageBtnActive : scss.pageBtn
                    }
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ),
              )}
              <button
                type="button"
                className={scss.pageArrow}
                disabled={page === totalPages}
                onClick={() =>
                  setPage((prev) => Math.min(totalPages, prev + 1))
                }
              >
                <ChevronRight size={15} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
