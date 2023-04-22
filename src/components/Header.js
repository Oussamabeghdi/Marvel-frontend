import Searchbar from "./Searchbar";
import Menu from "./Menu";
import "../styles/Header.css";

import logo from "../img/fond-decran-marvel.jpg";

const Header = ({ handleToken, token, searchResults, setSearchResults }) => {
  return (
    <header className="header-container">
      <div className="header-logo">
        <img src={logo} alt="marvel" />
      </div>
      <div className="menu-component">
        <Menu token={token} handleToken={handleToken} />
      </div>

      <Searchbar
        searchResults={searchResults}
        setSearchResults={setSearchResults}
      />
    </header>
  );
};

export default Header;
