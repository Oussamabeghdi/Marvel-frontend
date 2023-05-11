import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Menu.css";

const Menu = ({ token, handleTokenAndId, userId, onClose, navbarActive }) => {
  const navigate = useNavigate();

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

  return (
    <div
      className={
        navbarActive ? "navbar-wrapper navbar-active" : "navbar-wrapper"
      }
    >
      <div
        onClick={onClose}
        className={
          navbarActive ? "mobile-close-btn nav-active-flex" : "mobile-close-btn"
        }
      >
        <FontAwesomeIcon icon="xmark" size="xl" />
      </div>
      <ul
        className={navbarActive ? "menu nav-active-flex" : "menu"}
        onClick={onClose}
      >
        <li onClick={handleClickCharacters}>Characters</li>
        <li onClick={handleClickComics}>Comics</li>
        <li>
          <Link className="menu-link" to="/favorites">
            Favorites
          </Link>
        </li>
        {token ? (
          <li
            className="logout-btn"
            onClick={() => {
              handleTokenAndId(null);
              navigate("/");
            }}
          >
            Se déconnecter
          </li>
        ) : (
          <>
            <li>
              <Link className="menu-link" to="/signup">
                S'inscrire
              </Link>
            </li>
            <li>
              <Link className="menu-link" to="/login">
                Se connecter
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Menu;
