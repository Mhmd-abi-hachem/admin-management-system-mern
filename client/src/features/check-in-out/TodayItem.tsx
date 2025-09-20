import styles from "./TodayItem.module.css";
import Tag from "../../shared/ui/Tag/Tag";

interface TodayItemProps {
  activity: {
    status: "unconfirmed" | "checked-in";
    nationality: string;
    numNights: number;
    countryFlag: string;
    fullName: string;
  };
}

function TodayItem({ activity }: TodayItemProps) {
  const { status, nationality, numNights, countryFlag, fullName } = activity;

  return (
    <li className={styles.todayItem}>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      <img
        className={styles.flagImage}
        src={countryFlag}
        alt={`${nationality} flag nationality of ${fullName}`}
      />

      <div className="font-medium">{fullName}</div>
      <div className={styles.numNights}>{numNights} nights</div>
    </li>
  );
}

export default TodayItem;
