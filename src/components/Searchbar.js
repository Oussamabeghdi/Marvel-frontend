import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Searchbar = ({
  token,
  searchResults,
  setSearchResults,
  allSuggestions,
  setFilteredSuggestions,
  filteredSuggestions,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false); // État pour gérer la visibilité
  const [showItems, setShowItems] = useState(false);
  const location = useLocation();
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

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const handlecloseSuggestions = () => {
    setShowSuggestions(false);
  };
  useEffect(() => {
    setShowItems(false);
    if (token && location.pathname === "/profile") {
      setShowItems(false);
    } else {
      setShowItems(true);
    }
  }, [token, location.pathname]);
  return (
    <div className="searchbar">
      {token && showItems && (
        <>
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
        </>
      )}
      {showSuggestions && filteredSuggestions?.length > 0 && (
        <div className="suggestions-container">
          <ul className="suggestions-list">
            <div className="button-close-suggestions">
              <button
                style={{ width: "35px", background: "white", color: "black", borderRadius: "5px" }}
                onClick={handlecloseSuggestions}
              >
                X
              </button>
            </div>
            {filteredSuggestions.map((suggestion, index) => (
              <div className="suggestion-item">
                <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                  {suggestion}
                </li>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default Searchbar;
