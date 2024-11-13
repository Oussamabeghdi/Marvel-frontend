import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import axios from "axios";
import Cookies from "js-cookie";

const Profile = ({ token, userId, handleTokenAndId }) => {
  const [userInfo, setUserInfo] = useState({});
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

  return (
    <section className="profile-container">
      <h1>Mon Profil</h1>
      <div className="user-info">
        <p style={{ color: "white" }}>
          <strong>Nom d'utilisateur :</strong> {userInfo.username}
        </p>
        <p style={{ color: "white" }}>
          <strong>Email :</strong> {userInfo.email}
        </p>
        <p style={{ color: "white" }}>{/* <strong>Hash :</strong> {userInfo.hash} */}</p>
        <p style={{ color: "white" }}>{/* <strong>Salt :</strong> {userInfo.salt} */}</p>
        {/* <p style={{ color: "white" }}>
          <strong>Date d'inscription :</strong> {new Date(userInfo.createdAt).toLocaleDateString()}
        </p> */}
      </div>
      <button
        onClick={() => {
          // Logique pour se déconnecter, par exemple en supprimant le token
          handleLogout();
        }}
      >
        Se déconnecter
      </button>
      <button
        onClick={() => {
          handleDelete();
        }}
      >
        Supprimer votre compte
      </button>
    </section>
  );
};

export default Profile;
