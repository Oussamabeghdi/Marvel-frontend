import { useRef } from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Searchbar = ({ searchResults, setSearchResults, allSuggestions }) => {
  //Je crée une référence avec useRef et je l'initialise avec null,cette reference ne pointe vers rien donc elle est defenie à "null".
  // La référence sera ensuite liée à un élément DOM.
  const inputRef = useRef(null);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  useEffect(() => {
    if (searchResults.length > 1) {
      const filtered = allSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(searchResults.toLowerCase())
      );

      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [searchResults, allSuggestions]);

  const handleSearchResults = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchResults(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchResults(suggestion);
    setFilteredSuggestions([]);
  };
  // console.log(searchResults);
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
      {filteredSuggestions.length > 0 && (
        <ul className="suggestions-list">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="suggestion-item"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Searchbar;

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
