import "../styles/ShowHidePasswordButton.css";

const ShowHidePasswordButton = ({ passwordVisible, setPasswordVisibility, field }) => {
  const togglePasswordVisibility = () => {
    setPasswordVisibility(field, !passwordVisible[field]);
  };
  return (
    <button className="toggle-password-visibility" type="button" onClick={togglePasswordVisibility}>
      {passwordVisible[field] ? "👁" : "🔒"}
    </button>
  );
};
export default ShowHidePasswordButton;
