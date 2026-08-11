"use client";
import { IUserResult } from "@/hooks/types/userTypes";
import scss from "./usersTable.module.scss";

interface UsersTableProps {
  users: IUserResult[];
}

const UsersTable = ({ users }: UsersTableProps) => {
  return (
    <div className={scss.wrapper}>
      <div className={scss.tableWrapper}>
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
            {users.map((user) => {
              const firstLetter = user.name.charAt(0).toUpperCase();
              return (
                <tr key={user.id}>
                  <td>
                    <div className={scss.userCell}>
                      <div className={scss.avatar}>{firstLetter}</div>
                      <div className={scss.userInfo}>
                        <span className={scss.name}>{user.name}</span>
                      </div>
                    </div>
                  </td>
                  <td className={scss.email}>{user.email}</td>
                  <td>
                    <span
                      className={scss.badge}>
                        User
                    </span>
                  </td>
                  <td className={scss.places}>{user.places_count ?? 0}</td>
                  <td className={scss.joined}>
                    {new Date(user.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
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
              );
            })}
          </tbody>
        </table>
        {users.length === 0 && (
          <div className={scss.empty}>
            <h3>No users found</h3>
            <p>Try changing your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersTable;
