import { createContext, useContext } from "react";

import styles from "./Table.module.css";

interface TableContextType {
  columns: string;
}

const TableContext = createContext<TableContextType | null>(null);

interface TableProps {
  columns: string;
  children: React.ReactNode;
}

function Table({ columns, children }: TableProps) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div className={styles.table} role="table">
        {children}
      </div>
    </TableContext.Provider>
  );
}

function useTableContext() {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error(
      "Table components must be used within a <Table> component."
    );
  }
  return context;
}

function Header({ children }: { children: React.ReactNode }) {
  const { columns } = useTableContext();
  return (
    <header
      role="row"
      className={`${styles.commonRow} ${styles.header}`}
      style={{ gridTemplateColumns: columns }}
    >
      {children}
    </header>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  const { columns } = useTableContext();
  return (
    <div
      role="row"
      className={`${styles.commonRow} ${styles.row}`}
      style={{ gridTemplateColumns: columns }}
    >
      {children}
    </div>
  );
}

interface BodyProps<T> {
  data: T[];
  render: (item: T) => React.ReactNode;
}

function Body<T>({ data, render }: BodyProps<T>) {
  if (!data.length)
    return <p className={styles.empty}>No data to show at the moment</p>;
  return <section className={styles.body}>{data.map(render)}</section>;
}

function Footer({ children }: { children: React.ReactNode }) {
  return <footer className={styles.footer}>{children}</footer>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
