// // ResetPassword.js
// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const ResetPassword = () => {
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const { token } = useParams();
//   const navigate = useNavigate();

//   const handleReset = async (event) => {
//     event.preventDefault();
//     if (newPassword !== confirmPassword) {
//       setMessage("Les mots de passe ne correspondent pas.");
//       return;
//     }

//     try {
//       await axios.post(
//         "http://localhost:4000/reset-password",
//         // "https://site--marvel-backend--9gtnl5qyn2yw.code.run/reset-password",
//         {
//           token,
//           newPassword,
//         }
//       );
//       setMessage("Votre mot de passe a été réinitialisé avec succès.");
//       navigate("/login"); // Redirection vers la page de connexion
//     } catch (error) {
//       setMessage("Erreur lors de la réinitialisation du mot de passe. Veuillez réessayer.");
//     }
//   };

//   return (
//     <div>
//       <h1>Réinitialiser le mot de passe</h1>
//       <form onSubmit={handleReset}>
//         <input
//           type="password"
//           placeholder="Nouveau mot de passe"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Confirmez le mot de passe"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />
//         <button type="submit">Réinitialiser</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default ResetPassword;
