import styles from "./Tag.module.css";

interface TagProps {
  type: "blue" | "green";
  children: React.ReactNode;
}

function Tag({ type = "blue", children }: TagProps) {
  const typeClass = styles[type] || styles.blue;

  return <span className={`${styles.tag} ${typeClass}`}>{children}</span>;
}

export default Tag;
