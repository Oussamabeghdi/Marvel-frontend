import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Menu.css";

const Menu = ({ token, handleTokenAndId, userId, onClose, navbarActive }) => {
  const navigate = useNavigate();

  //Gestion de la navigation pour la page (characters): si le token et le userId existe alors la navigation se fait vers la page /characteres
  const handleClickCharacters = () => {
    if (token && userId) {
      navigate("/characters");
      //sinon on est renvoyé vers la page /login
    } else {
      navigate("/login");
    }
  };
  //Gestion de la navigation pour la page (comics) :si le token et le userId existe alors la navigation se fait vers la page /comics
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

  return (
    <div className={navbarActive ? "navbar-wrapper navbar-active" : "navbar-wrapper"}>
      <div
        onClick={onClose}
        className={navbarActive ? "mobile-close-btn nav-active-flex" : "mobile-close-btn"}
      >
        <FontAwesomeIcon icon="xmark" size="xl" />
      </div>
      <ul className={navbarActive ? "menu nav-active-flex" : "menu"} onClick={onClose}>
        {token ? (
          <>
            <li onClick={handleClickCharacters}>Personnages</li>
            <li onClick={handleClickComics}>Comics</li>
            <li onClick={handleGoToFavorites}> Favoris</li>
          </>
        ) : null}

        {/* 
        <Link
          className="menu-link"
          to={token && userId ? "/favorites" : "/login"}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Favorites
        </Link> */}
        {!token ? (
          <li>
            <Link className="menu-link" to="/login">
              Connexion
            </Link>
          </li>
        ) : null}

        {token ? (
          <li
            className="logout-btn"
            onClick={() => {
              handleTokenAndId(null);
              navigate("/");
            }}
          >
            Déconnexion
          </li>
        ) : (
          <>
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
