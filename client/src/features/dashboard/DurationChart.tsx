import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import styles from "./DurationChart.module.css";
import { useDarkMode } from "../../context/DarkModeContext";
import Heading from "../../shared/ui/Heading/Heading";

const startDataLight = [
  {
    duration: "1 night",
    value: 7,
    color: "#ef4444",
  },
  {
    duration: "2 nights",
    value: 2,
    color: "#f97316",
  },

  {
    duration: "4-5 nights",
    value: 5,

    color: "#84cc16",
  },

  {
    duration: "6-7 nights",
    value: 1,
    color: "#15803d",
  },

  {
    duration: "21+ nights",
    value: 3,
    color: "#a855f7",
  },
];

const startDataDark = [
  {
    duration: "1 night",
    value: 7,
    color: "#b91c1c",
  },
  {
    duration: "2 nights",
    value: 2,
    color: "#c2410c",
  },
  {
    duration: "4-5 nights",
    value: 5,
    color: "#4d7c0f",
  },
  {
    duration: "6-7 nights",
    value: 1,
    color: "#15803d",
  },

  {
    duration: "21+ nights",
    value: 3,
    color: "#7e22ce",
  },
];

function DurationChart() {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  return (
    <>
      <div className={styles.chartBox}>
        <Heading as="h2">Stay duration summary</Heading>

        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={startData}
              nameKey="duration"
              dataKey="value"
              innerRadius={85}
              outerRadius={110}
              cx="40%"
              cy="50%"
              paddingAngle={3}
            >
              {startData.map((entry) => (
                <Cell
                  fill={entry.color}
                  stroke={entry.color}
                  key={entry.duration}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="middle"
              align="right"
              width="30%"
              layout="vertical"
              iconSize={15}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default DurationChart;
