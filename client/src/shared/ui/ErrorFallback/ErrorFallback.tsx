import Button from "../Button/Button";
import Heading from "../Heading/Heading";
import styles from "./ErrorFallback.module.css";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <main className={styles.errorFallback}>
      <div className={styles.box}>
        <Heading as="h1">Something went wrong 🧐</Heading>
        <p>{error.message}</p>
        <Button size="large" onClick={resetErrorBoundary}>
          Try again
        </Button>
      </div>
    </main>
  );
}

export default ErrorFallback;
