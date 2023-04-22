import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/Login.css";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        handleToken(response.data.token);
        console.log(handleToken);
        navigate("/characters");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="login">
      <form className="login-container" onSubmit={handleLogin}>
        <h1>Se connecter</h1>
        <div>
          <label>email</label>
          <input
            value={email}
            type="email"
            // placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            value={password}
            type="password"
            // placeholder="Mot de passe"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div>
          <input type="submit" value="Se connecter" />
          <Link to="/signup">
            <p className="span">Pas encore de compte ? Inscris-toi !</p>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
