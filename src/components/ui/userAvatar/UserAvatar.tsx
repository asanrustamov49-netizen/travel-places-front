import scss from "./userAvatar.module.scss";

interface UserAvatarProps {
  name: string;
  size?: "small" | "medium" | "large";
}

const UserAvatar = ({ name, size = "medium" }: UserAvatarProps) => {
  const initial = name.trim().charAt(0).toUpperCase();
  const colors = [
    "#2563EB",
    "#7C3AED",
    "#059669",
    "#D97706",
    "#DB2777",
    "#0891B2",
  ];
  const index = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const backgroundColor = colors[index % colors.length];
  return (
    <div className={`${scss.avatar} ${scss[size]}`} style={{ backgroundColor }}>
      {initial}
    </div>
  );
};

export default UserAvatar;
