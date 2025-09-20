import React from "react";

import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";
import Spinner from "../../shared/ui/Spinners/Spinner";
import { UseStats } from "./UseStats";

function DashboardLayout() {
  const { stats, isLoadingStats } = UseStats();

  if (isLoadingStats) return <Spinner />;

  return (
    <div
      className="  grid gap-6
    /* Desktop layout */
    md:grid-cols-4 md:grid-rows-[auto_34rem_auto]
    /* Mobile layout */
    grid-cols-1 grid-rows-auto"
    >
      <Stats stats={stats} />
      <TodayActivity />
      <DurationChart />
      <SalesChart />
    </div>
  );
}

export default DashboardLayout;
