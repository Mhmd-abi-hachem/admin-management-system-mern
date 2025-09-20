import { Link } from "react-router-dom";
import React from "react";

import styles from "./UserAvatar.module.css";
import { useUser } from "./useUser";
import SpinnerMini from "../../shared/ui/Spinners/SpinnerMini";

function UserAvatar() {
  const { user, isLoadingUser } = useUser();

  if (isLoadingUser) return <SpinnerMini />;

  if (!user || !user.user) return;

  const { avatar, name } = user.user;

  return (
    <Link to="/my-account">
      <div className={styles.userAvatar}>
        <img
          src={avatar || "/default-user.jpg"}
          alt={`Avatar of ${name}`}
          className={styles.avatar}
        />
        <span className="hover:underline text-[1.8rem]">{name}</span>
      </div>
    </Link>
  );
}

export default UserAvatar;
