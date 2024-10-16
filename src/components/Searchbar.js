import { useRef } from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Searchbar = ({
  searchResults,
  setSearchResults,
  allSuggestions,
  setFilteredSuggestions,
  filteredSuggestions,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false); // État pour gérer la visibilité

  const inputRef = useRef(null);
  useEffect(() => {
    if (searchResults.length > 2) {
      const filtered = allSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(searchResults.toLowerCase())
      );

      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [searchResults, allSuggestions, setFilteredSuggestions]);

  const handleSearchResults = (event) => {
    const value = event.target.value;
    setSearchResults(value);
    setShowSuggestions(value.length > 2);
  };

  const handleSuggestionClick = (suggestion, filtered) => {
    setSearchResults(suggestion);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };
  //Je crée un evenement au clique sur l'icone,
  // qui aura pour effet de mettre le focus sur l'input
  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <div className="searchbar">
      <input
        className="input-search"
        type="text"
        value={searchResults}
        placeholder="Rechercher ..."
        onChange={handleSearchResults}
        //l'attribut ref attache la reference à l'element input,
        ref={inputRef}
      />
      <div>
        <FontAwesomeIcon
          icon="fa-solid fa-magnifying-glass"
          size="lg"
          className="search-icon"
          onClick={handleIconClick}
        />
      </div>
      {showSuggestions && filteredSuggestions?.length > 0 && (
        <ul className="suggestions-list">
          {filteredSuggestions.map((suggestion, index) => (
            <div className="suggestion-item">
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Searchbar;
//Je crée une référence avec useRef et je l'initialise avec null,cette reference ne pointe vers rien donc elle est defenie à "null".
// La référence sera ensuite liée à un élément DOM.

// const handleSearchResults = (event) => {
//   setSearchResults(event.target.value);
//   let value = event.target.value;
//   value.length > 2 && setSearchResults(value);
// };
// const handleKeyBottom = () => {
//   if (inputRef.current) {
//     inputRef.current.focus();
//   }
// };
