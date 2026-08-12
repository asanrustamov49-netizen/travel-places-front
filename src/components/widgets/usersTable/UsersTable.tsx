"use client";
import { IUserResult } from "@/hooks/types/userTypes";
import scss from "./usersTable.module.scss";
import { useDeleteUser } from "@/hooks/functions/users/useDeleteUser";
import { useState } from "react";
import { useUpdateUser } from "@/hooks/functions/users/useUpdateUser";

interface UsersTableProps {
  users: IUserResult[];
}

const UsersTable = ({ users }: UsersTableProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUserResult | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();
  const handleUpdate = () => {
    if (!selectedUser) return;
    updateUser.mutate(
      {
        id: selectedUser.id,
        name,
        email,
      },
      {
        onSuccess: () => {
          setIsEditOpen(false);
          setSelectedUser(null);
        },
      },
    );
  };
  const handleDelete = () => {
    if (!selectedUser) return;
    deleteUser.mutate(selectedUser.id, {
      onSuccess: () => {
        setIsDeleteOpen(false);
        setSelectedUser(null);
      },
    });
  };
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
                    <span className={scss.badge}>User</span>
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
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedUser(user);
                          setName(user.name);
                          setEmail(user.email);
                          setIsEditOpen(true);
                        }}
                        className={scss.editBtn}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedUser(user);
                          setIsDeleteOpen(true);
                        }}
                        className={scss.deleteBtn}
                      >
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
      {/* EDIT MODAL */}
      {isEditOpen && (
        <div className={scss.modalOverlay}>
          <div className={scss.modal}>
            <button className={scss.close} onClick={() => setIsEditOpen(false)}>
              ×
            </button>
            <h2>Edit Profile</h2>
            <p className={scss.modalDescription}>
              Update your account information.
            </p>
            <div className={scss.form}>
              <label>Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
              <label>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                type="email"
              />
            </div>
            <div className={scss.modalActions}>
              <button
                className={scss.cancelBtn}
                onClick={() => setIsEditOpen(false)}
              >
                Cancel
              </button>
              <button
                className={scss.saveBtn}
                onClick={handleUpdate}
                disabled={updateUser.isPending}
              >
                {updateUser.isPending ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* DELETE MODAL */}
      {isDeleteOpen && (
        <div className={scss.modalOverlay}>
          <div className={scss.modal}>
            <button
              className={scss.close}
              onClick={() => setIsDeleteOpen(false)}
            >
              ×
            </button>
            <div className={scss.deleteIcon}>!</div>
            <h2>Delete User?</h2>
            <p className={scss.modalDescription}>
              This action cannot be undone. This account and profile information
              will be permanently deleted.
            </p>
            <div className={scss.modalActions}>
              <button
                className={scss.cancelBtn}
                onClick={() => setIsDeleteOpen(false)}
              >
                Cancel
              </button>
              <button
                className={scss.confirmDeleteBtn}
                onClick={handleDelete}
                disabled={deleteUser.isPending}
              >
                {deleteUser.isPending ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
