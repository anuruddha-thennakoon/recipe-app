import "./SearchBar.css";
import React, { useState } from "react";

interface SearchBarProps {
  fetchAllRecipes: () => void;
  fetchRecipeByName: (name: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  fetchAllRecipes,
  fetchRecipeByName,
}) => {
  const [name, setName] = useState<string>("");

  return (
    <div className="search__container">
      <input
        type="text"
        placeholder="Search Recipe"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        data-cy="clear"
        onClick={() => {
          fetchAllRecipes();
          setName("");
        }}
      >
        X
      </button>
      <button data-cy="search" onClick={() => fetchRecipeByName(name)}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
