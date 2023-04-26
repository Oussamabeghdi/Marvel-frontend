import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Header.css";

const Menu = ({ token, handleTokenAndId, id }) => {
  const [nav, setNav] = useState(false);

  const navigate = useNavigate();

  const handleClickCharacters = () => {
    if (token) {
      navigate("/characters");
    } else {
      navigate("/login");
    }
  };
  const handleClickComics = () => {
    if (token && id) {
      navigate("/comics");
    } else {
      navigate("/login");
    }
  };

  const handleNav = () => {
    setNav(!nav);
  };

  const onClose = () => setNav(false);

  return (
    <div className="nav-link">
      {/* <ul className="menu"> */}

      <ul className={nav ? "menu active" : " menu"}>
        <div onClick={onClose} className="header-btn">
          <li>
            <button onClick={handleClickCharacters}>Characters</button>
          </li>
          <li>
            <button onClick={handleClickComics}>Comics</button>
          </li>

          <li>
            <Link to="/character/5fcf91f4d8a2480017b91453">
              <button>Favorites</button>
            </Link>
          </li>

          {token ? (
            <li>
              <button
                className="logout-btn"
                onClick={() => {
                  handleTokenAndId(null);
                  navigate("/");
                }}
              >
                Se déconnecter
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/signup">
                  <button>S'inscrire</button>
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <button>Se connecter</button>
                </Link>
              </li>
            </>
          )}
        </div>
      </ul>

      <div onClick={handleNav} className="mobile-btn">
        {nav ? (
          <FontAwesomeIcon icon="xmark" size="xl" />
        ) : (
          <FontAwesomeIcon icon="bars" size="xl" />
        )}
      </div>
    </div>
  );
};

export default Menu;
