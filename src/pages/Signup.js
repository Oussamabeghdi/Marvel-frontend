import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import validator from "validator";
import "../styles/Signup.css";

const Signup = ({ handleTokenAndId }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [textInput, setTextInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const validateForm = () => {
    const newErrors = {};

    // Valider l'email
    if (!validator.isEmail(email)) {
      newErrors.email = "Email invalide.";
    }

    // Valider le mot de passe (exemple : minimum 6 caractères)
    if (password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères.";
    }

    // Valider le texte pour éviter les caractères non sécurisés
    // if (validator.contains(textInput, "<script>")) {
    //   newErrors.textInput = "Le champ contient du contenu potentiellement dangereux.";
    // }

    return newErrors;
  };
  const handleSignup = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    setErrorMessage(validationErrors);

    // Si pas d'erreurs, continuer avec la logique d'inscription
    if (Object.keys(validationErrors).length === 0) {
      console.log("Formulaire valide, soumission...");
      // Logique d'envoi des données, ex. envoyer au backend via une API
      setErrorMessage({});
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

          setSuccessMessage("Félicitation! Votre inscription a été enregistrée avec succès! ");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      } catch (error) {
        if (error.response.data.message === "email already used") {
          setErrorMessage({
            email:
              "Cette adresse email est déjà associée à un compte. Veuillez utiliser une autre adresse email ou récupérer votre compte existant.",
          });
          // } else if (error.response.data.message === "missing parameters") {
          //   setErrorMessage({ global: "Veuillez remplir tous les champs !" });
        } else if (error.response.data.message === "The passwords do not match.") {
          setErrorMessage({
            confirmPassword: "Veuillez vous assurer que les deux mots de passe sont identiques.",
          });
          // } else if (error.response.data.message === "missing parameters") {
          //   setErrorMessage({ global: "Veuillez remplir tous les champs !" });
        } else {
          setErrorMessage({ global: "Veuillez remplir tous les champs !" });
        }
        // {
        //   setErrorMessage({ global: "Veuillez remplir tous les champs !" });
        // }
      }
    }
  };

  return (
    <section className="register-container">
      <div className="signup-container">
        {successMessage && (
          <div className="sucessMessage-container">
            <p className="successMessage-subscribe">{successMessage} </p>
          </div>
        )}

        <form onSubmit={handleSignup}>
          <h1>S'inscrire</h1>
          {/* <label className="label-for-signup" htmlFor="username"></label> */}
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
          {/* <label className="label-for-signup" htmlFor="email"></label> */}
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

          {/* <label className="label-for-signup" htmlFor="password"></label> */}
          <input
            id="password"
            value={password}
            type="password"
            placeholder="Mot de passe"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          {/* <label className="label-for-signup" htmlFor="confirmPassword"></label> */}
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
          {errorMessage.global && (
            <p style={{ color: "red" }}>{errorMessage.global}</p>
            // <div className={`err-message ${errorMessage.global ? "" : "hidden"}`}>
            // </div>
          )}

          {errorMessage.email && <p style={{ color: "red" }}>{errorMessage.email}</p>}
          {errorMessage.password && <p style={{ color: "red" }}>{errorMessage.password}</p>}
          {errorMessage.confirmPassword && (
            <p style={{ color: "red" }}>{errorMessage.confirmPassword}</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Signup;
