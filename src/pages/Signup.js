import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/Signup.css";

const Signup = ({ handleTokenAndId }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://site--marvel-backend--9gtnl5qyn2yw.code.run/signup",
        {
          username: username,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        }
      );
      console.log(response.data);
      if (response.data.token) {
        handleTokenAndId(response.data.token, response.data._id);
        navigate("/characters");
      }
    } catch (error) {
      if (error.response.data.message === "email already used") {
        setErrorMessage(
          "Cette adresse email est déjà associée à un compte. Veuillez utiliser une autre adresse email ou récupérer votre compte existant."
        );
      }
      if (error.response.data.message === "missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs!");
      }
    }
  };

  return (
    <section>
      <form className="signup-container" onSubmit={handleSignup}>
        <h1>S'inscrire</h1>
        <label className="label-for-signup" htmlFor="username">
          Nom :
        </label>
        <input
          label="username"
          id="username"
          value={username}
          type="text"
          // placeholder="username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label className="label-for-signup" htmlFor="email">
          Email :
        </label>

        <input
          label="email"
          id="email"
          value={email}
          type="mail"
          // placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <label className="label-for-signup" htmlFor="password">
          Mot de passe :
        </label>

        <input
          id="password"
          value={password}
          type="password"
          // placeholder="Mot de passe"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <label className="label-for-signup" htmlFor="confirmPassword">
          Confirmer mot de passe :
        </label>

        <input
          id="confirmPassword"
          value={confirmPassword}
          type="password"
          // placeholder="Confirmer votre mot de passe"
          onChange={(event) => {
            setConfirmPassword(event.target.value);
          }}
        />

        <input className="signup-btn" type="submit" value="S'inscrire" />
        <div className={`err-message ${errorMessage ? "" : "hidden"}`}>
          <p>{errorMessage}</p>
        </div>

        <Link to="/login">
          <div className="tu-as-deja-un-cpte">
            <h1>Tu as déjà un compte? Connecte-toi !</h1>
          </div>
        </Link>
      </form>
    </section>
  );
};

export default Signup;
