import { useDarkMode } from "../../context/DarkModeContext";
import styles from "./Logo.module.css";

function Logo() {
  const { isDarkMode } = useDarkMode();
  const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png";

  return (
    <div className={styles.logoContainer}>
      <img className={styles.logo} src={src} alt="The Wild Oasis Logo" />
    </div>
  );
}

export default Logo;
