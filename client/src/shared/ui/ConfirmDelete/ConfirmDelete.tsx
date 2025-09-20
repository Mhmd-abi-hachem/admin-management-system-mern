import Button from "../Button/Button";
import Heading from "../Heading/Heading";
import styles from "./ConfirmDelete.module.css";

interface ConfirmDeleteProps {
  resourceName: string;
  disabled: boolean;
}

function ConfirmDelete({ resourceName, disabled }: ConfirmDeleteProps) {
  return (
    <div className={styles.confirmDelete}>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button variation="secondary" disabled={disabled}>
          Cancel
        </Button>
        <Button variation="danger" disabled={disabled}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
