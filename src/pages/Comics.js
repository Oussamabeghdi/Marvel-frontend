import { useEffect, useState } from "react";
import axios from "axios";
import Paginate from "../components/Paginate";
import { Oval } from "react-loader-spinner";
import ComicsCard from "../components/ComicsCard";
import "../styles/Comics.css";

const Comics = ({
  searchResults,
  setSearchResults,
  setAllSuggestions,
  currentPageData,
  onChangeCurrentPage,
  onChangeCurrentPageData,
  currentPage,
  setCurrentPage,
  userId,
}) => {
  const [data, setData] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setCurrentPage(0);
  }, [setCurrentPage]);
  useEffect(() => {
    setSearchResults("");
  }, [setSearchResults]);

  useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      try {
        const response = await axios.get(
          `https://site--marvel-backend--9gtnl5qyn2yw.code.run/comics?title=${searchResults}`
        );
        const comicsTitles = response.data.results.map((comics) => comics.title);
        setAllSuggestions(comicsTitles);
        // console.log(response.data);
        setData(response.data.results);
        setFilteredData(response.data.results);
      } catch (error) {
        console.log({ message: error.message });
      } finally {
        setIsloading(false);
      }
    };

    fetchData(); // Effectue la requête seulement après le délai du debounce
  }, [searchResults, setAllSuggestions]);
  useEffect(() => {
    if (searchResults.length > 2) {
      const filteredComicsData = data?.filter((comics) =>
        comics.title.toLowerCase().startsWith(searchResults.toLowerCase())
      );
      setFilteredData(filteredComicsData); // Met à jour les données filtrées
    } else {
      setFilteredData(data); // Si aucune recherche, afficher tous les personnages
    }
  }, [searchResults, data, setFilteredData]); // Dépendance sur searchResults et data

  const itemsPerPage = 16;
  const indexOfFirstItem = currentPage * itemsPerPage; // Début de la page actuelle
  const indexOfLastItem = indexOfFirstItem + itemsPerPage;
  const currentPageComics = filteredData?.slice(indexOfFirstItem, indexOfLastItem);
  return isloading ? (
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
    <section className="comics-wrapper">
      <div className="comics-container">
        {currentPageComics?.length > 0 ? (
          currentPageComics.map((comics, index) => {
            return <ComicsCard item={comics} key={index} userId={userId} />;
          })
        ) : (
          <p style={{ fontSize: "26px", color: "white" }}>Aucun personnage trouvé</p>
        )}
      </div>
      <div className="paginate-comics">
        <Paginate
          data={filteredData}
          itemsPerPage={itemsPerPage}
          onChangeCurrentPageData={onChangeCurrentPageData}
          currentPage={currentPage}
          onChangeCurrentPage={onChangeCurrentPage}
        />
      </div>
    </section>
  );
};

export default Comics;
