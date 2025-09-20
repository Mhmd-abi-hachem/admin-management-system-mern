import { Link } from "react-router-dom";

import styles from "./Sidebar.module.css";
import MainNav from "../MainNav/MainNav";
import Logo from "../Logo";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Link to="/">
        <Logo />
      </Link>

      <MainNav />

      <p className={styles.copyright}>&copy; 2025. By Mohamad Abi Hachem</p>
    </aside>
  );
}

export default Sidebar;
