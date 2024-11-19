import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import axios from "axios";
import Cookies from "js-cookie";

const Profile = ({ token, userId, handleTokenAndId }) => {
  const [userInfo, setUserInfo] = useState({});
  const [changeUsername, setChangeUsername] = useState("");
  const [changeEmail, setChangeEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const handleLogout = () => {
    handleTokenAndId(null, null);
    navigate("/login");
  };

  //   const params = useParams();
  //   const user = params.id;
  useEffect(() => {
    const token = Cookies.get("token-user");
    const userId = Cookies.get("userId");
    if (token && userId) {
      const fetchUserInfo = async () => {
        try {
          //   if (!userId || !token) {
          //     throw new Error("Token ou ID utilisateur manquant");
          //   }
          const response = await axios.get(
            // `http://localhost:4000/user/${userId}`
            `https://site--marvel-backend--9gtnl5qyn2yw.code.run/user/${userId}`
            // {
            //   headers: {
            //     Authorization: `Bearer ${token}`,
            //   },
            // }
          );

          setUserInfo(response.data);
          console.log(response.data.token);
          console.log(userId);
        } catch (error) {
          console.log(error.message);

          console.log("Erreur lors de la récupération des infos utilisateur:", error);
        }
      };
      fetchUserInfo();
    }
  }, [token, userId, navigate]);
  const handleDelete = async () => {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer vos informations ?");
    if (confirmation) {
      try {
        const response = await axios.delete(
          `https://site--marvel-backend--9gtnl5qyn2yw.code.run/user/${userId}`
        );
        if (response.status === 200) {
          alert("Vos informations ont été supprimées.");

          handleLogout();
        }
      } catch (error) {
        console.error("Erreur lors de la suppression", error);
        alert("Échec de la suppression de vos informations.");
      }
    }
  };

  const handleFieldUpdate = async () => {
    try {
      const response = await axios.put(
        `https://site--marvel-backend--9gtnl5qyn2yw.code.run/update/user/${userId}`,
        {
          "account.username": changeUsername,
          email: changeEmail,
        }
      );
      if (response.status === 200) {
        alert("Mise à jour réussie");
        setSuccessMessage("Mise à jour réussie");
      }
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.message === "Error updating user") {
        setMessage("Veuillez remplir tous les champs");
      }
    }
  };
  return (
    <section className="profile-container">
      <p style={{ color: "red" }}>{successMessage}</p>
      <p style={{ color: "red" }}>{message} </p>
      <h1>Mon Profil 👨‍🏫</h1>
      <div className="user-info">
        <table>
          <tr>
            <th>Nom</th>
            <th>Email</th>
          </tr>
          <tr>
            <td> {userInfo.username}</td>
            <td> {userInfo.email}</td>
          </tr>
          <tr>
            <td>
              <input
                style={{
                  width: "90%",
                  height: "27px",
                  borderRadius: "5px",
                  border: "none",
                  padding: "6px",
                }}
                value={changeUsername}
                id="username"
                type="text"
                placeholder="Entrez votre nouveau nom ..."
                onChange={(e) => {
                  setChangeUsername(e.target.value);
                }}
              />
            </td>

            <td>
              <input
                style={{
                  width: "90%",
                  height: "27px",
                  borderRadius: "5px",
                  border: "none",
                  padding: "6px",
                }}
                value={changeEmail}
                id="email"
                type="email"
                placeholder="Entrez votre nouvel email ..."
                onChange={(e) => {
                  setChangeEmail(e.target.value);
                }}
              />
            </td>
          </tr>
        </table>
        <button
          className="modify-button-profile"
          onClick={() => {
            handleFieldUpdate();
          }}
        >
          Modifier mes informations
        </button>
      </div>
      <div className="button-profile-container">
        <button
          className="button-profile"
          onClick={() => {
            // Logique pour se déconnecter, par exemple en supprimant le token
            handleLogout();
          }}
        >
          Se déconnecter
        </button>

        <button
          className="button-profile"
          onClick={() => {
            handleDelete();
          }}
        >
          Supprimer mon compte
        </button>
        <button
          className="button-profile"
          onClick={() => {
            setChangeUsername("");
            setChangeEmail("");
            setMessage("");
          }}
        >
          Effacer
        </button>
      </div>
    </section>
  );
};

export default Profile;
