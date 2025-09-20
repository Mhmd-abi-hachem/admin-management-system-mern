import Spinner from "../../shared/ui/Spinners/Spinner";
import Stat from "./Stat";
import styles from "./Stats.module.css";

import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

interface StatsData {
  bookings: number;
  sales: number;
  checkIns: number;
  occupation: number;
}

interface StatsProps {
  stats: StatsData[];
}

function Stats({ stats }: StatsProps) {
  if (stats.length === 0) {
    return <Spinner />;
  }

  const { bookings, sales, checkIns, occupation } = stats[0];
  return (
    <div className={styles.statsContainer}>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        value={bookings}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Sales"
        value={`$${(sales / 100).toLocaleString("en-US", {
          minimumFractionDigits: 2,
        })}`}
        color="green"
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Check ins"
        value={checkIns}
        color="indigo"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="Occupancy rate"
        value={`${occupation}%`}
        color="yellow"
      />
    </div>
  );
}

export default Stats;
