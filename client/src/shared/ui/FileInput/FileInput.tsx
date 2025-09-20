import styles from "./FileInput.module.css";

function FileInput({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input type="file" className={styles.fileInput} {...props} />;
}

export default FileInput;
