import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/Login.css";

const Login = ({ handleTokenAndId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://site--marvel-backend--9gtnl5qyn2yw.code.run/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      if (response.data.token) {
        handleTokenAndId(response.data.token, response.data._id);
        console.log(handleTokenAndId);
        navigate("/characters");
      }
    } catch (error) {
      if (error.response.data.message === "User not found") {
        setErrorMessage(
          "L'adresse email ou le mot de passe est incorrect. Veuillez réessayer."
        );
      }
      if (error.response.data.message === "Unauthorized") {
        setErrorMessage(
          "L'adresse email ou le mot de passe est incorrect. Veuillez réessayer."
        );
      }
    }
  };

  return (
    <section className="login">
      <form className="login-container" onSubmit={handleLogin}>
        <h1>Se connecter</h1>
        <div>
          <label className="label" htmlFor="email">
            Email :
          </label>
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
        <div>
          <label className="label" htmlFor="password">
            Password :
          </label>
          <input
            value={password}
            id="password"
            type="password"
            placeholder="Mot de passe"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div>
          <input className="login-btn" type="submit" value="Se connecter" />
          {errorMessage && (
            <p
              style={{
                color: "red",
                fontWeight: "bold",
              }}
            >
              {errorMessage}
            </p>
          )}
          <Link to="/signup">
            <p className="span">Pas encore de compte ? Inscris-toi !</p>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
