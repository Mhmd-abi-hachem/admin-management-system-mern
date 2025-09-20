import React from "react";

interface ButtonGroupProps {
  children: React.ReactNode;
}

function ButtonGroup({ children }: ButtonGroupProps) {
  return <div className="flex gap-5 justify-end">{children}</div>;
}

export default ButtonGroup;
