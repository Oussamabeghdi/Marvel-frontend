import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Menu.css";
import { useState, useEffect } from "react";

const Menu = ({
  token,
  handleTokenAndId,
  userId,
  onClose,
  navbarActive,
  filteredSuggestions,
  setFilteredSuggestions,
  setTilte,
  setSearchResults,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showItems, setShowItems] = useState(false);

  const handleClickCharacters = () => {
    if (token && userId) {
      navigate("/characters");
    } else {
      navigate("/login");
    }
  };

  const handleClickComics = () => {
    if (token && userId) {
      navigate("/comics");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    setShowItems(false);
    if (token && location.pathname !== "/login" && location.pathname !== "/signup") {
      setShowItems(true);
    } else if (token && location.pathname === "/login" && location.pathname === "/signup") {
      setShowItems(false);
      const timer = setTimeout(() => {
        setShowItems(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [token, location.pathname]);
  return (
    <div className={navbarActive ? "navbar-wrapper navbar-active" : "navbar-wrapper"}>
      <div
        onClick={onClose}
        className={navbarActive ? "mobile-close-btn nav-active-flex" : "mobile-close-btn"}
      >
        <FontAwesomeIcon icon="xmark" size="xl" />
      </div>
      <ul className={navbarActive ? "menu nav-active-flex" : "menu"} onClick={onClose}>
        {token && showItems && (
          <>
            <li
              onClick={() => {
                handleClickCharacters();
                // setSearchResults("");
              }}
            >
              Personnages
            </li>
            <li
              onClick={() => {
                handleClickComics();
                // setSearchResults("");
              }}
            >
              Comics
            </li>

            <Link to="/favorites">
              <li>Favoris</li>
            </Link>
            <li className="button-go-to-profil">
              <Link to="/profile">
                <span>Profil</span>
                <FontAwesomeIcon className="user" icon="user" color="white" />
              </Link>
            </li>
          </>
        )}

        {token && showItems ? (
          <li
            className="logout-btn"
            onClick={() => {
              handleTokenAndId(null, null);
              navigate("/login");
            }}
          >
            Déconnexion
          </li>
        ) : (
          <>
            <Link className="menu-link" to="/login">
              <button className="login-button">Connexion</button>
            </Link>

            <Link className="menu-link" to="/signup">
              <button className="signup-button"> S'inscrire</button>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default Menu;
