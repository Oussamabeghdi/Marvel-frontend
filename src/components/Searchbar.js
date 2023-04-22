import { useState } from "react";
import Modal from "react-modal";

const Searchbar = ({ searchResults, setSearchResults }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleCloseModal = () => {
    // Fermer la modal
    setModalIsOpen(false);

    // Effacer les résultats de recherche pour la prochaine recherche
    setSearchResults([]);
  };

  return (
    <div className="searchbar">
      <input
        className="input-search"
        type="text"
        placeholder="Search"
        onChange={(event) => setSearchResults(event.target.value)}
      />

      <Modal isOpen={modalIsOpen}>
        <button onClick={handleCloseModal}>Fermer</button>

        <h2>Résultats de recherche</h2>
      </Modal>
    </div>
  );
};

export default Searchbar;
