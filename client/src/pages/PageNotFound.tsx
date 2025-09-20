import { useMoveBack } from "../shared/hooks/useMoveBack";
import Button from "../shared/ui/Button/Button";
import Heading from "../shared/ui/Heading/Heading";
import styles from "./PageNotFound.module.css";

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <main className={styles.pageNotFound}>
      <div className={styles.box}>
        <Heading as="h1">
          The page you are looking for could not be found 😢
        </Heading>
        <Button onClick={moveBack} size="large">
          &larr; Go back
        </Button>
      </div>
    </main>
  );
}

export default PageNotFound;
