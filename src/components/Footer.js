import logo from "../img/logo.png";
import "../styles/Footer.css";
import MenuFooter from "./MenuFooter.js";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = ({ token, setToken }) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={logo} alt="marvel" />
        </div>
        <div>
          <span>Copyright © 2024. Tous droits réservés </span>
        </div>
        <div className={token ? "vertical-separator" : ""}></div>
        <>
          <MenuFooter token={token} setToken={setToken} />
        </>
      </div>
    </footer>
  );
};

export default Footer;
