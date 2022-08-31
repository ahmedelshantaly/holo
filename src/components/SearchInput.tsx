import { ChangeEvent, Dispatch, SetStateAction } from "react";

type Props = {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setSearchCriteria: Dispatch<SetStateAction<string>>;
  setSearchResults: Dispatch<SetStateAction<[]>>;
};

export default function SearchInput({
  searchTerm,
  setSearchTerm,
  setSearchCriteria,
  setSearchResults,
}: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchCriteriaOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchCriteria(e.target.value);
    setSearchResults([]);
  };

  return (
    <div className="search-input">
      <div className="search-input__wrapper">
        <label htmlFor="search">Github searcher</label>
        <div className="serch-input__group">
          <input
            type="text"
            id="search"
            name="search"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Start typing to search..."
          />
          <select
            name="criteria"
            id="criteria"
            onChange={handleSearchCriteriaOnChange}
          >
            <option value="repositories">Repositories</option>
            <option value="users">Users</option>
          </select>
        </div>
      </div>
    </div>
  );
}
