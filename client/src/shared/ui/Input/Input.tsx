import React from "react";

import styles from "./Input.module.css";

function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={styles.input} {...props} />;
}

export default Input;
