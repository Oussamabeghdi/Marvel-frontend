const Searchbar = ({ searchResults, setSearchResults }) => {
  const handleSearchResults = (event) => {
    setSearchResults(event.target.value);
    let value = event.target.value;
    value.length > 2 && setSearchResults(value);
  };
  console.log(searchResults);
  return (
    <div className="searchbar">
      <input
        className="input-search"
        type="text"
        placeholder="Search"
        onChange={handleSearchResults}
      />
    </div>
  );
};

export default Searchbar;
