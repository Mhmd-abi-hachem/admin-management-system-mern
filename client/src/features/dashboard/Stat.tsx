import styles from "./Stat.module.css";

interface StatProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: "blue" | "green" | "yellow" | "red" | "indigo";
}

function Stat({ icon, title, value, color }: StatProps) {
  return (
    <div className={styles.stat}>
      <div className={`${styles.icon} ${styles[color]}`}>{icon}</div>
      <h5 className={styles.title}>{title}</h5>
      <p className={styles.value}>{value}</p>
    </div>
  );
}

export default Stat;
