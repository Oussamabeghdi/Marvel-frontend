import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Paginate from "../components/Paginate";
import CharactersCard from "../components/CharactersCard";
import { Oval } from "react-loader-spinner";
import "../styles/Characters.css";

const Characters = ({
  searchResults, // Résultats de la recherche passée en prop
  setSearchResults,
  currentPage, // Page actuelle passée en prop
  allSuggestions,
  setAllSuggestions,
  setCurrentPage, // Fonction pour changer la page actuelle passée en prop
  currentPageData, // Données de la page actuelle passée en prop
  onChangeCurrentPage, // Fonction pour changer la page actuelle passée en prop
  onChangeCurrentPageData, // Fonction pour changer les données de la page actuelle passée en prop
  userId, // ID de l'utilisateur passé en prop
}) => {
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setCurrentPage(0);
  }, [setCurrentPage]);
  useEffect(() => {
    setSearchResults("");
  }, [setSearchResults]);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://site--marvel-backend--9gtnl5qyn2yw.code.run/characters?&name=${searchResults}`
        ); // Requête API pour récupérer les personnages en fonction des résultats de recherche
        const charactersNames = response.data?.results.map((characters) => characters.name);
        setAllSuggestions(charactersNames); // Stocke les noms dans allSuggestions

        // console.log(response.data.results); // Affiche les données de la réponse dans la console
        setData(response.data.results); // Met à jour l'état avec les données récupérées
        setFilteredData(response.data.results);
      } catch (error) {
        console.log(error.response.data.message); // Affiche le message d'erreur dans la console
      } finally {
        setIsLoading(false); // Assurez-vous que le chargement est terminé ici
      }
    };

    fetchData();

    // Appel de la fonction fetchData
  }, [searchResults, setAllSuggestions]); // Dépendance du useEffect : se déclenche lorsque searchResults change
  useEffect(() => {
    if (searchResults.length > 2) {
      const filtered = data?.filter((characters) =>
        characters.name.toLowerCase().startsWith(searchResults.toLowerCase())
      );
      setFilteredData(filtered); // Met à jour les données filtrées
    } else {
      setFilteredData(data); // Si aucune recherche, afficher tous les personnages
    }
  }, [searchResults, data]); // Dépendance sur searchResults et data

  const itemsPerPage = 16;
  const indexOfFirstItem = currentPage * itemsPerPage; // Début de la page actuelle
  const indexOfLastItem = indexOfFirstItem + itemsPerPage;
  const currentPageCharacters = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  // Affichage conditionnel en fonction de l'état de chargement
  return isLoading ? (
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
      <div>
        <button className="button-return-to-previous-page" onClick={() => navigate(-1)}>
          <span className="arrow">⥢</span>
        </button>
      </div>
      <section className="wrapper-characters">
        <div className="characters-container">
          {currentPageCharacters?.length > 0 ? (
            currentPageCharacters.map((characters) => (
              <CharactersCard
                key={characters._id}
                item={characters}
                userId={userId}
                setSearchResults={setSearchResults}
              /> // Affiche une carte de personnage pour chaque élément dans currentPageData
            ))
          ) : (
            <p style={{ fontSize: "26px", color: "white" }}>Aucun personnage trouvé</p>
          )}
        </div>
        <div className="paginate-characters">
          <Paginate
            data={filteredData}
            itemsPerPage={itemsPerPage}
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
