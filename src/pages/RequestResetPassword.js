// // RequestResetPassword.js
// import { useState } from "react";
// import axios from "axios";

// const RequestResetPassword = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   const handleRequest = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:4000/request-reset-password",
//         // "https://site--marvel-backend--9gtnl5qyn2yw.code.run/request-reset-password",
//         { email }
//       );
//       console.log(response.data);
//       setMessage(
//         "Un email a été envoyé avec des instructions pour réinitialiser votre mot de passe."
//       );
//     } catch (error) {
//       setMessage("Erreur lors de l'envoi de l'email. Veuillez réessayer.");
//     }
//   };

//   return (
//     <div>
//       <h1>Réinitialiser le mot de passe</h1>
//       <form onSubmit={handleRequest}>
//         <input
//           type="email"
//           placeholder="Entrez votre email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button type="submit">Envoyer</button>
//       </form>
//       {message && <p style={{ color: "red" }}>{message}</p>}
//     </div>
//   );
// };

// export default RequestResetPassword;
