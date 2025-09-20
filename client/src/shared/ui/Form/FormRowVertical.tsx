import React, { type ReactElement } from "react";

import styles from "./FormRowVertical.module.css";

interface FormRowVerticalProps {
  label?: string;
  error?: string;
  children: ReactElement & { props: { id: string } };
}

function FormRowVertical({ label, error, children }: FormRowVerticalProps) {
  return (
    <div className={styles.formRow}>
      {label && (
        <label className={styles.label} htmlFor={children.props.id}>
          {label}
        </label>
      )}
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default FormRowVertical;
