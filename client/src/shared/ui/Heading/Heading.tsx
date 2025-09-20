import React, { type JSX } from "react";

import styles from "./Heading.module.css";

interface HeadingProps {
  as: "h1" | "h2" | "h3" | "h4";
  children: React.ReactNode;
}

function Heading({ as, children }: HeadingProps) {
  const Tag = as as keyof JSX.IntrinsicElements;

  const classes = `${styles.common} ${styles[as]}`;

  return <Tag className={classes}>{children}</Tag>;
}

export default Heading;
