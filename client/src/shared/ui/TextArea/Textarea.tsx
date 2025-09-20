import styles from "./Textarea.module.css";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

function Textarea({ ...props }: TextareaProps) {
  return <textarea className={styles.textarea} {...props} />;
}

export default Textarea;
