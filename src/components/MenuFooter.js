// import { useState } from "react";
import "../styles/MenuFooter.css";
// import { ReactComponent as Heart } from "../assets/svg/heart.svg";

// import { ReactComponent as Facebook } from "../assets/svg/facebook.svg";
// import { ReactComponent as Instagram } from "../assets/svg/instagram.svg";

const MenuFooter = ({ token }) => {
  return token ? (
    <div>
      <div className="menu-footer">
        <div className="menu-footer-title">
          <h3>Pages</h3>
        </div>

        <ul className="menu-list-footer">
          <li>
            <a href="/characters">Personnages</a>
          </li>
          <li>
            <a href="/comics">Comics</a>
          </li>
          <li>
            <a href="/Favorites">Favoris</a>
          </li>

          <li></li>
        </ul>
      </div>
    </div>
  ) : (
    <div>
      <span>texte</span>
    </div>
  );
};

export default MenuFooter;
