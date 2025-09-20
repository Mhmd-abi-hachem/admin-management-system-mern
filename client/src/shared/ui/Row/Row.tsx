import styles from "./Row.module.css";

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "horizontal" | "vertical";
  children: React.ReactNode;
}

function Row({ type = "vertical", children, ...props }: RowProps) {
  const typeClass = type === "horizontal" ? styles.horizontal : styles.vertical;

  return (
    <div className={`${styles.row} ${typeClass}`} {...props}>
      {children}
    </div>
  );
}

export default Row;
