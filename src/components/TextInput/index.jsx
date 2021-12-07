import "./styles.css";

export const TextInput = ({ onChange, value }) => (
  <input
    onChange={onChange}
    type="search"
    value={value}
    className={"text-input"}
    placeholder="Type your search"
  />
);
