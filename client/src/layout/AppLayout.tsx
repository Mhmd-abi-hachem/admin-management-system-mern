import Header from "../shared/ui/Header/Header";
import Sidebar from "../shared/ui/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.appLayout}>
      <Sidebar />
      <Header />
      <main
        className={styles.main}
      >
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
