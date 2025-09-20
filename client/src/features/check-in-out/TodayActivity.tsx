import { useQuery } from "@tanstack/react-query";

import styles from "./TodayActivity.module.css";
import TodayItem from "./TodayItem";
import SpinnerMini from "../../shared/ui/Spinners/SpinnerMini";
import Row from "../../shared/ui/Row/Row";
import Heading from "../../shared/ui/Heading/Heading";

function TodayActivity() {
  const { data: activities, isLoading } = useQuery({
    queryKey: ["todayActivity"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}today-activity`,
        { credentials: "include" }
      );

      if (!response.ok)
        throw new Error(
          "An error occured while fetching the activities data. Please try again."
        );

      const activity = await response.json();
      return activity.data;
    },
  });
  return (
    <div className={styles.today}>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>

      {!isLoading ? (
        activities?.length > 0 ? (
          <ul className={styles.todayList}>
            {activities.map((activity) => (
              <TodayItem activity={activity} key={activity._id} />
            ))}
          </ul>
        ) : (
          <p className={styles.noActivity}>No activities for today</p>
        )
      ) : (
        <div className="h-full flex justify-center items-center">
          <SpinnerMini />
        </div>
      )}
    </div>
  );
}

export default TodayActivity;
