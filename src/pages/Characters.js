import { useEffect, useState } from "react";
import axios from "axios";
import Paginate from "../components/Paginate";
import CharactersCard from "../components/CharactersCard";
import { Oval } from "react-loader-spinner";
import "../styles/Characters.css";

const Characters = ({
  searchResults, // Résultats de la recherche passée en prop
  currentPage, // Page actuelle passée en prop
  allSuggestions,
  setAllSuggestions,
  setCurrentPage, // Fonction pour changer la page actuelle passée en prop
  currentPageData, // Données de la page actuelle passée en prop
  onChangeCurrentPage, // Fonction pour changer la page actuelle passée en prop
  onChangeCurrentPageData, // Fonction pour changer les données de la page actuelle passée en prop
  userId, // ID de l'utilisateur passé en prop
}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--9gtnl5qyn2yw.code.run/characters?name=${searchResults}`
        ); // Requête API pour récupérer les personnages en fonction des résultats de recherche
        const characterNames = response.data.results.map((character) => character.name);
        setAllSuggestions(characterNames); // Stocke les noms dans allSuggestions

        console.log(response.data); // Affiche les données de la réponse dans la console
        setData(response.data); // Met à jour l'état avec les données récupérées
        setIsLoading(false); // Met à jour l'état de chargement à false
      } catch (error) {
        console.log(error.response.data.message); // Affiche le message d'erreur dans la console
      }
    };

    fetchData(); // Appel de la fonction fetchData
  }, [searchResults, setAllSuggestions]); // Dépendance du useEffect : se déclenche lorsque searchResults change

  return isLoading ? ( // Affichage conditionnel en fonction de l'état de chargement
    <div className="loading-wrapper">
      <Oval
        ariaLabel="loading-indicator"
        height={100}
        width={100}
        strokeWidth={1000}
        strokeWidthSecondary={1000}
        color="black"
        secondaryColor="red"
      />
    </div>
  ) : (
    <>
      <section className="wrapper-characters">
        <div className="characters-container">
          {currentPageData.map((character) => {
            return (
              <CharactersCard key={character._id} item={character} userId={userId} /> // Affiche une carte de personnage pour chaque élément dans currentPageData
            );
          })}
        </div>
        <div className="paginate-characters">
          <Paginate
            data={data.results}
            itemsPerPage={16}
            onChangeCurrentPageData={onChangeCurrentPageData}
            currentPage={currentPage}
            onChangeCurrentPage={onChangeCurrentPage}
          />
        </div>
      </section>
    </>
  );
};

export default Characters;
