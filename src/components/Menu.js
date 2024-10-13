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

  //Gestion de la navigation pour la page (characters):si le token et le userId existe alors la navigation
  // se fait vers la page /characteres
  const handleClickCharacters = () => {
    if (token && userId) {
      navigate("/characters");
      //sinon on est renvoyé vers la page /login
    } else {
      navigate("/login");
    }
  };
  //Gestion de la navigation pour la page (comics) :si le token et le userId existe alors la navigation
  // se fait vers la page /comics
  const handleClickComics = () => {
    if (token && userId) {
      navigate("/comics");
    } else {
      //sinon on est renvoyé vers la page /login
      navigate("/login");
    }
  };
  //Gestion de la navigation pour la page (favoris) :si le token et le userId existe alors la navigation se fait vers la page /comics

  const handleGoToFavorites = () => {
    if (token && userId) {
      navigate("/favorites");
    } else {
      //sinon on est renvoyé vers la page /login
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
      }, 1000);
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
                setSearchResults("");
              }}
            >
              Personnages
            </li>
            <li
              onClick={() => {
                handleClickComics();
                setSearchResults("");
              }}
            >
              Comics
            </li>
            <li
              onClick={() => {
                handleGoToFavorites();
                setSearchResults("");
              }}
            >
              Favoris
            </li>
            <li className="button-go-to-profil">
              <Link to="/profile">
                <span>Profil</span>
                <FontAwesomeIcon className="user" icon="user" color="white" />
              </Link>
            </li>
          </>
        )}
        <></>
        {token && showItems ? (
          <li
            className="logout-btn"
            onClick={() => {
              handleTokenAndId(null);
              setSearchResults("");
              navigate("/");
            }}
          >
            Déconnexion
          </li>
        ) : (
          <>
            <li>
              <Link className="menu-link" to="/login">
                Connexion
              </Link>
            </li>
            {/* {!token && (
          )} */}
            <li>
              <Link className="menu-link" to="/signup">
                S'inscrire
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Menu;
