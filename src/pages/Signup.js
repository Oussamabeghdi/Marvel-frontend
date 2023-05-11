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
          "Cet email est déjà associé à un compte. Veuillez utiliser une autre adresse email ou récupérer votre compte existant."
        );
      }
      if (error.response.data.message === "missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs svp!");
      }
    }
  };

  return (
    <section>
      <form className="signup-container" onSubmit={handleSignup}>
        <h1>S'inscrire</h1>
        <input
          label="username"
          id="username"
          value={username}
          type="text"
          placeholder="username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
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

        <input
          id="Mot de passe"
          value={password}
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <input
          id="Confirmer votre mot de passe"
          value={confirmPassword}
          type="password"
          placeholder="Confirmer votre mot de passe"
          onChange={(event) => {
            setConfirmPassword(event.target.value);
          }}
        />

        <input className="signup-btn" type="submit" value="S'inscrire" />
        {errorMessage && (
          <p
            style={{
              color: "rgb(197, 180, 19)",
              fontWeight: "bold",
            }}
          >
            {errorMessage}
          </p>
        )}
        <Link to="/login">
          <h1>Tu as déjà un compte? connecte-toi !</h1>
        </Link>
      </form>
    </section>
  );
};

export default Signup;
