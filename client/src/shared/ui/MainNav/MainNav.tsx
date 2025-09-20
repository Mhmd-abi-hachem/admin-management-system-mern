import { NavLink } from "react-router-dom";
import {
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

import styles from "./MainNav.module.css";

function MainNav() {
  return (
    <nav className="md:!mt-12 ">
      <ul className={styles.navList}>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
            end
          >
            <HiOutlineHome />
            <span>Home</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/cabins"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/add-users"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            <HiOutlineUsers />
            <span>Add Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
