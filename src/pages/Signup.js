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
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "https://site--marvel-backend--9gtnl5qyn2yw.code.run/signup",
        // "http://localhost:4000/signup",
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

        setSuccessMessage(
          "Félicitation! Votre inscription a été enregistrée avec succès! Vous pouvez maintenant vous connecter."
        );
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      if (error.response.data.message === "email already used") {
        setErrorMessage(
          "Cette adresse email est déjà associée à un compte. Veuillez utiliser une autre adresse email ou récupérer votre compte existant."
        );
      }
      if (error.response.data.message === "missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs !");
      }
      if (error.response.data.message === "The passwords do not match.") {
        setErrorMessage("Les mots de passe ne correspondent pas !");
      }
    }
  };

  return (
    <section className="register-container">
      <div className="signup-container">
        <div className="erreurMessage">
          <p style={{ color: "white" }}>{successMessage} </p>
        </div>
        <form onSubmit={handleSignup}>
          <h1>S'inscrire</h1>
          <label className="label-for-signup" htmlFor="username"></label>
          <input
            label="username"
            id="username"
            value={username}
            type="text"
            placeholder="Nom"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <label className="label-for-signup" htmlFor="email"></label>
          <input
            label="email"
            id="email"
            value={email}
            type="mail"
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <label className="label-for-signup" htmlFor="password"></label>
          <input
            id="password"
            value={password}
            type="password"
            placeholder="Mot de passe"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <label className="label-for-signup" htmlFor="confirmPassword"></label>
          <input
            id="confirmPassword"
            value={confirmPassword}
            type="password"
            placeholder="Confirmer mot de passe"
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
          />
          <input className="signup-btn" type="submit" value="S'inscrire" />

          <Link to="/login">
            <div className="tu-as-deja-un-cpte">
              <p>Tu as déjà un compte? Connecte-toi !</p>
            </div>
          </Link>
          <div className={`err-message ${errorMessage ? "" : "hidden"}`}>
            <p>{errorMessage}</p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
