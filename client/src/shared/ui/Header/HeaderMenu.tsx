import React from "react";

import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import Logout from "../../../features/authentication/Logout";

function HeaderMenu() {
  return (
    <ul className="flex gap-1.5 list-none m-0 p-0">
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </ul>
  );
}

export default HeaderMenu;
