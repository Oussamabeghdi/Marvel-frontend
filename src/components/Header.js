import Searchbar from "./Searchbar";
import Menu from "./Menu";
import "../styles/Header.css";
import logo from "../img/fond-decran-marvel.jpg";
import { useState, useEffect } from "react";

import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({
  handleTokenAndId,
  userId,
  token,
  searchResults,
  setSearchResults,
  setSuggestions,
  suggestions,
  allSuggestions,
  setAllSuggestions,
  sucessMessage,
}) => {
  const location = useLocation();
  const [navbarActive, setNavbarActive] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const onOpenNavbar = () => setNavbarActive(true);
  const onCloseNavbar = () => setNavbarActive(false);
  useEffect(() => {
    setShowItems(false);
    if (token && location.pathname !== "/login") {
      const timer = setTimeout(() => {
        setShowItems(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [token, location.pathname]);
  return (
    <header className="header-container">
      <div className="header-logo">
        {token ? (
          <Link to="/characters" onClick={() => setSearchResults("")}>
            <img src={logo} alt="marvel" />
          </Link>
        ) : (
          <img src={logo} alt="marvel" />
        )}
      </div>
      <p>{sucessMessage} </p>
      <div className="menu-desktop">
        <Menu
          setSearchResults={setSearchResults}
          token={token}
          handleTokenAndId={handleTokenAndId}
          userId={userId}
          onClose={onCloseNavbar}
          navbarActive={navbarActive}
        />
      </div>

      {token && showItems ? (
        <Searchbar
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          setSuggestions={setSuggestions}
          suggestions={suggestions}
          allSuggestions={allSuggestions}
          setAllSuggestions={setAllSuggestions}
        />
      ) : null}
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
