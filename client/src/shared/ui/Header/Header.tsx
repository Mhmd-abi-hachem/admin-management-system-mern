import React from "react";

import styles from "./Header.module.css";
import UserAvatar from "../../../features/authentication/UserAvatar";
import HeaderMenu from "./HeaderMenu";

function Header() {
  return (
    <header className={styles.header}>
      <UserAvatar />
      <HeaderMenu />
    </header>
  );
}

export default Header;
