import React from "react";

import styles from "./ButtonText.module.css";

interface ButtonTextProps {
  children: React.ReactNode;
}

function ButtonText({ children }: ButtonTextProps) {
  return <button className={styles.buttonText}>{children}</button>;
}

export default ButtonText;
