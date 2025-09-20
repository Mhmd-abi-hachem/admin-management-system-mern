import styles from "./Select.module.css";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  value: string;
  onChange: (event: React.FormEvent<HTMLSelectElement>) => void;
  type?: "default" | "white";
}

function Select({
  options,
  value,
  onChange,
  type = "default",
  ...props
}: SelectProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      {...props}
      className={`${styles.select} ${
        type === "white" ? styles.selectWhite : ""
      }`}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
