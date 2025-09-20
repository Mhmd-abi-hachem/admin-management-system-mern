import React from "react";

import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
  variation?: "primary" | "secondary" | "danger";
  children: React.ReactNode;
}

function Button({
  size = "medium",
  variation = "primary",
  children,
  ...props
}: ButtonProps) {
  const sizeClass = styles[size];
  const variationClass = styles[variation];

  return (
    <button
      className={`${styles.button} ${sizeClass} ${variationClass}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
