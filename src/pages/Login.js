import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ShowHidePasswordButton from "../components/ShowHidePasswordButton";
import "../styles/Login.css";
import "../styles/ShowHidePasswordButton.css";

const Login = ({ token, handleTokenAndId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post(
        "https://site--marvel-backend--9gtnl5qyn2yw.code.run/login",
        {
          email: email,
          password: password,
        }
      );

      if (response.data.token) {
        handleTokenAndId(response.data.token, response.data._id);
        console.log(`token : ${response.data.token}`);
        setSuccessMessage("Connexion en cours...");

        setTimeout(() => {
          navigate("/characters");
        }, 1000);
      }
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.message === "missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs!");
      }
      if (error.response.data.message === "User not found") {
        setErrorMessage("Utilisateur non trouvé. Veuillez réessayer.");
      }
      if (error.response.data.message === "Unauthorized") {
        setErrorMessage("L'adresse email ou le mot de passe est incorrect. Veuillez réessayer.");
      }
    }
  };
  const setPasswordVisibility = (field, value) => {
    setPasswordVisible((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <section className="login">
      <div className="successMessage-container">
        {successMessage && (
          <div className="successMessage">
            <p>{successMessage}</p>
          </div>
        )}
      </div>

      <form className="login-container" onSubmit={handleLogin}>
        <h1>Se connecter</h1>
        <div>
          <label className="label" htmlFor="email"></label>
          <input
            value={email}
            id="email"
            type="email"
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className="input-password">
          <input
            value={password}
            id="password"
            type={passwordVisible.password ? "text" : "password"}
            placeholder="Mot de passe"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <ShowHidePasswordButton
            // className="toggle-password-visibility-signup"
            passwordVisible={passwordVisible}
            setPasswordVisibility={setPasswordVisibility}
            field="password"
          />
          {/* <button
            className="toggle-password-visibility"
            type="button"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? "👁" : "🔒"}
          </button> */}
        </div>
        <div className="login-btn-link-to-subscribe-container">
          <input className="login-btn" type="submit" value="Se connecter" />

          <Link to="/signup">
            <div className="link-to-subscribe">
              <p>Pas encore de compte ? Inscris-toi !</p>
            </div>
          </Link>
          <div className="errorMessage">{errorMessage && <p>{errorMessage}</p>}</div>
        </div>
      </form>
    </section>
  );
};

export default Login;
