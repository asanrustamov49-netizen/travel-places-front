"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import scss from "./mainProfile.module.scss";
import { useUpdateUser } from "@/hooks/functions/users/useUpdateUser";
import { useDeleteUser } from "@/hooks/functions/users/useDeleteUser";
import UserAvatar from "@/components/ui/userAvatar/UserAvatar";
import { IUserProfile } from "@/hooks/types/userTypes";

interface IProfile {
  profile: IUserProfile;
}

const MainProfile = ({ profile }: IProfile) => {
  const {push} = useRouter();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();
  const handleUpdate = () => {
    updateUser.mutate(
      {
        id: profile.id,
        name,
        email,
      },
      {
        onSuccess: () => {
          setIsEditOpen(false);
        },
      },
    );
  };
  const handleDelete = () => {
    deleteUser.mutate(profile.id, {
      onSuccess: () => {
        localStorage.removeItem("token");
        push("/");
      },
    });
  };

  return (
    <section className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          <div className={scss.profileInfo}>
            <div className={scss.avatarWrapper}>
              <UserAvatar name={profile.name} size="large"/>
            </div>

            <div className={scss.info}>
              <h1>{profile.name}</h1>

              <p className={scss.email}>{profile.email}</p>

              <div className={scss.stats}>
                <div className={scss.stat}>
                  <strong>{profile.total_places}</strong>
                  <span>Places</span>
                </div>

                <div className={scss.stat}>
                  <strong>{profile.total_places}</strong>
                  <span>Countries</span>
                </div>

                <div className={scss.stat}>
                  <strong>
                    {new Date(profile.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </strong>

                  <span>Member since</span>
                </div>
              </div>
            </div>
          </div>

          <div className={scss.actions}>
            <button
              type="button"
              className={scss.editBtn}
              onClick={() => setIsEditOpen(true)}
            >
              Edit Profile
            </button>

            <button
              type="button"
              className={scss.deleteBtn}
              onClick={() => setIsDeleteOpen(true)}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
      {isEditOpen && (
        <div className={scss.modalOverlay}>
          <div className={scss.modal}>
            <button
              type="button"
              className={scss.close}
              onClick={() => setIsEditOpen(false)}
            >
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
                type="button"
                className={scss.cancelBtn}
                onClick={() => setIsEditOpen(false)}
              >
                Cancel
              </button>

              <button
                type="button"
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
      {isDeleteOpen && (
        <div className={scss.modalOverlay}>
          <div className={scss.modal}>
            <button
              type="button"
              className={scss.close}
              onClick={() => setIsDeleteOpen(false)}
            >
              ×
            </button>

            <div className={scss.deleteIcon}>!</div>

            <h2>Delete Account?</h2>

            <p className={scss.modalDescription}>
              This action cannot be undone. Your account and profile information
              will be permanently deleted.
            </p>

            <div className={scss.modalActions}>
              <button
                type="button"
                className={scss.cancelBtn}
                onClick={() => setIsDeleteOpen(false)}
              >
                Cancel
              </button>

              <button
                type="button"
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
    </section>
  );
};

export default MainProfile;
