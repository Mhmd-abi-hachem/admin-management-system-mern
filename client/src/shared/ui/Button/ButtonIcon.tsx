import React from "react";

import styles from "./ButtonIcon.module.css";

interface ButtonIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function ButtonIcon({ children, ...props }: ButtonIconProps) {
  return (
    <button className={styles.buttonIcon} {...props}>
      {children}
    </button>
  );
}

export default ButtonIcon;
