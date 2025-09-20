import React from "react";

import styles from "./Form.module.css";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  type?: "regular" | "modal";
  children: React.ReactNode;
}

function Form({ type = "regular", children, onSubmit }: FormProps) {
  const formType = type === "modal" ? styles.formModal : styles.formRegular;
  const classes = `${styles.form} ${formType}`;

  return (
    <form onSubmit={onSubmit} className={classes}>
      {children}
    </form>
  );
}

export default Form;
