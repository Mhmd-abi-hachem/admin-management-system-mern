import React, { type ReactElement } from "react";

import styles from "./FormRow.module.css";

interface FormRowProps {
  label?: string;
  error?: string | undefined;
  children: React.ReactNode;
}

function FormRow({ label, error, children }: FormRowProps) {
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

export default FormRow;
