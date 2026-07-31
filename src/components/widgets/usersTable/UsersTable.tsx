"use client";

import { useState } from "react";
import scss from "./usersTable.module.scss";

type Role = "Admin" | "User";

type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  places: number;
  joined: string;
};

const USERS: User[] = [
  {
    id: "1",
    name: "Sofia Nakamura",
    email: "sofia@example.com",
    role: "Admin",
    places: 3,
    joined: "Jan 15, 2024",
  },
  {
    id: "2",
    name: "Marco Esposito",
    email: "marco@example.com",
    role: "User",
    places: 1,
    joined: "Mar 22, 2024",
  },
  {
    id: "3",
    name: "Yuki Tanaka",
    email: "yuki@example.com",
    role: "User",
    places: 1,
    joined: "May 10, 2024",
  },
  {
    id: "4",
    name: "Elena Papadopoulos",
    email: "elena@example.com",
    role: "User",
    places: 1,
    joined: "Jun 18, 2024",
  },
  {
    id: "5",
    name: "Lucia Fernández",
    email: "lucia@example.com",
    role: "User",
    places: 1,
    joined: "Aug 5, 2024",
  },
];

const TOTAL_PAGES = 2;

const roleClass: Record<Role, string> = {
  Admin: scss.badgeAdmin,
  User: scss.badgeUser,
};

const UsersTable = () => {
  const [page, setPage] = useState(1);

  return (
    <div className={scss.wrapper}>
      <table className={scss.table}>
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Places</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {USERS.map((user) => (
            <tr key={user.id}>
              <td>
                <div className={scss.userCell}>
                  <div className={scss.avatar}>{user.name.charAt(0)}</div>
                  <span className={scss.userName}>{user.name}</span>
                </div>
              </td>

              <td className={scss.email}>{user.email}</td>

              <td>
                <span className={`${scss.badge} ${roleClass[user.role]}`}>
                  {user.role}
                </span>
              </td>

              <td className={scss.places}>{user.places}</td>

              <td className={scss.joined}>{user.joined}</td>

              <td>
                <div className={scss.actions}>
                  <button type="button" className={scss.editBtn}>
                    Edit
                  </button>
                  <button type="button" className={scss.deleteBtn}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={scss.footer}>
        <span className={scss.resultsInfo}>
          Showing 1–{USERS.length} of {USERS.length + 3} results
        </span>

        <div className={scss.pagination}>
          <button
            type="button"
            className={scss.pageArrow}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            ←
          </button>

          {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              type="button"
              className={`${scss.pageBtn} ${
                page === num ? scss.pageBtnActive : ""
              }`}
              onClick={() => setPage(num)}
            >
              {num}
            </button>
          ))}

          <button
            type="button"
            className={scss.pageArrow}
            onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
            disabled={page === TOTAL_PAGES}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
