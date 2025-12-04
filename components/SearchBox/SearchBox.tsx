import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchBox({ onChange }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={onChange}
    />
  );
}

export default SearchBox;
