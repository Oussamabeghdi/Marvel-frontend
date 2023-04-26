import Searchbar from "./Searchbar";
import Menu from "./Menu";
import "../styles/Header.css";

import logo from "../img/fond-decran-marvel.jpg";

const Header = ({
  handleTokenAndId,
  id,
  token,
  searchResults,
  setSearchResults,
}) => {
  return (
    <header className="header-container">
      <div className="header-logo">
        <img src={logo} alt="marvel" />
      </div>
      <div className="menu-component">
        <Menu token={token} handleTokenAndId={handleTokenAndId} id={id} />
      </div>

      <Searchbar
        searchResults={searchResults}
        setSearchResults={setSearchResults}
      />
    </header>
  );
};

export default Header;
