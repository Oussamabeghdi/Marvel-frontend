import Searchbar from "./Searchbar";
import Menu from "./Menu";
import "../styles/Header.css";

import logo from "../img/fond-decran-marvel.jpg";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({
  handleTokenAndId,
  userId,
  token,
  searchResults,
  setSearchResults,
}) => {
  const [navbarActive, setNavbarActive] = useState(false);

  const onOpenNavbar = () => setNavbarActive(true);
  const onCloseNavbar = () => setNavbarActive(false);

  return (
    <header className="header-container">
      <div className="header-logo">
        <img src={logo} alt="marvel" />
      </div>
      <div className="menu-desktop">
        <Menu
          token={token}
          handleTokenAndId={handleTokenAndId}
          userId={userId}
          onClose={onCloseNavbar}
          navbarActive={navbarActive}
        />
      </div>
      {token ? <Searchbar
      
        searchResults={searchResults}
        setSearchResults={setSearchResults}
      /> :null}
      <div onClick={onOpenNavbar} className="open-navbar-btn">
        <FontAwesomeIcon icon="bars" size="xl" />
      </div>
      <div className="menu-mobile">
        <Menu
          token={token}
          handleTokenAndId={handleTokenAndId}
          userId={userId}
          onClose={onCloseNavbar}
          navbarActive={navbarActive}
        />
      </div>
    </header>
  );
};

export default Header;
