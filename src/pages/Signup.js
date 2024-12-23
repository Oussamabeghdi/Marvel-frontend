import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import validator from "validator";
import ShowHidePasswordButton from "../components/ShowHidePasswordButton";
import "../styles/Signup.css";
import "../styles/ShowHidePasswordButton.css";

const Signup = ({ handleTokenAndId }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [textInput, setTextInput] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // Valider l'email
    if (!validator.isEmail(email)) {
      newErrors.email = "Email invalide";
    }

    // Valider le mot de passe (exemple : minimum 6 caractères)
    if (password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères.";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
    // Valider le texte pour éviter les caractères non sécurisés
    if (validator.contains(textInput, "<script>")) {
      newErrors.textInput = "Le champ contient du contenu potentiellement dangereux.";
    }

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
          {
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
          }
        );
        // console.log(response.data);
        console.log(response.data.token);

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
        } else if (error.response.data.message === "missing parameters") {
          setErrorMessage({ parameters: "Veuillez remplir tous les champs !" });
        }
        // else {
        //   setErrorMessage({ global: "Un problème est survenu, veuillez réessayer." });
        // }
      }
    }
  };
  const handleInputChange = (setter) => (event) => {
    // Suppression des balises <script>
    const sanitizedInput = event.target.value.replace(/<script>/gi, "");
    // Mettre à jour l'état correspondant
    setter(sanitizedInput);
    // Mettre à jour textInput pour la vérification
    setTextInput(sanitizedInput);
  };
  const setPasswordVisibility = (field, value) => {
    setPasswordVisible((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <section className="register-container">
      <div className="signup-container">
        {successMessage && (
          <div className="sucessMessage-container">
            <p className="successMessage-subscribe">{successMessage} </p>
          </div>
        )}
        <div>
          <form onSubmit={handleSignup}>
            <h1>S'inscrire</h1>
            <input
              label="username"
              id="username"
              value={username}
              type="text"
              placeholder="Nom"
              onChange={handleInputChange(setUsername)}
            />
            <input
              label="email"
              id="email"
              value={email}
              type="mail"
              placeholder="Email"
              onChange={handleInputChange(setEmail)}
            />

            <div className="input-password-btn-visibility-container">
              <input
                id="password"
                value={password}
                type={passwordVisible.password ? "text" : "password"}
                placeholder="Mot de passe"
                onChange={handleInputChange(setPassword)}
              />
              <ShowHidePasswordButton
                passwordVisible={passwordVisible}
                setPasswordVisibility={setPasswordVisibility}
                field="password"
              />
            </div>
            <div className="input-password-btn-visibility-container">
              <input
                id="confirmPassword"
                value={confirmPassword}
                type={passwordVisible.confirmPassword ? "text" : "password"}
                placeholder="Confirmer mot de passe"
                onChange={handleInputChange(setConfirmPassword)}
              />
              <ShowHidePasswordButton
                passwordVisible={passwordVisible}
                setPasswordVisibility={setPasswordVisibility}
                field="confirmPassword"
              />
            </div>

            <input className="signup-btn" type="submit" value="S'inscrire" />

            <Link to="/login">
              <div className="tu-as-deja-un-cpte">
                <p>Tu as déjà un compte? Connecte-toi !</p>
              </div>
            </Link>
            {errorMessage.parameters && <span> {errorMessage.parameters}</span>}
            {errorMessage.glopal && <span> {errorMessage.glopal}</span>}
            {errorMessage.email && <span>{errorMessage.email}</span>}
            {errorMessage.password && <span>{errorMessage.password}</span>}
            {errorMessage.confirmPassword && <span>{errorMessage.confirmPassword}</span>}
            {errorMessage.textInput && <span>{errorMessage.textInput}</span>}
          </form>
        </div>
      </div>
      {/* {errorMessage.global && <span style={{ color: "red" }}>{errorMessage.global}</span>} */}
    </section>
  );
};

export default Signup;
