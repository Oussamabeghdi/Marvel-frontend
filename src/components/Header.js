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
}) => {
  const [navbarActive, setNavbarActive] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const location = useLocation();
  const onOpenNavbar = () => setNavbarActive(true);
  const onCloseNavbar = () => setNavbarActive(false);
  useEffect(() => {
    setShowItems(false);
    if (token && location.pathname !== "/login" && location.pathname !== "/signup") {
      setShowItems(true);
    } else if (token && location.pathname === "/login" && location.pathname === "/signup") {
      setShowItems(false);
      const timer = setTimeout(() => {
        setShowItems(true);
      }, 2000);
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
      {token && showItems && (
        <Searchbar
          token={token}
          setFilteredSuggestions={setFilteredSuggestions}
          filteredSuggestions={filteredSuggestions}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          setSuggestions={setSuggestions}
          suggestions={suggestions}
          allSuggestions={allSuggestions}
          setAllSuggestions={setAllSuggestions}
        />
      )}
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
          setSearchResults={setSearchResults}
        />
      </div>
    </header>
  );
};

export default Header;
