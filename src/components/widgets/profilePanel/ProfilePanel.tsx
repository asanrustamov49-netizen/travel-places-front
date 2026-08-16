"use client";
import HomeCards from "@/components/ui/homeCards/HomeCards";
import scss from "./profilePanel.module.scss";
import { IUserProfile } from "@/hooks/types/userTypes";
import { useRouter } from "next/navigation";

interface IProfilePanelProps {
  profile: IUserProfile;
}

const ProfilePanel = ({ profile }: IProfilePanelProps) => {
  const { push } = useRouter();
  return (
    <section className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          <div className={scss.header}>
            <h2>
              My Places <span>({profile.places.length})</span>
            </h2>
            <button onClick={() => push("/add")} className={scss.addBtn}>
              + Add Place
            </button>
          </div>
          <div className={scss.cards}>
            {profile.places.map((place) => (
              <HomeCards key={place.id} place={place} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePanel;
