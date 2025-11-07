import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Paginate from "../components/Paginate";
import CharactersCard from "../components/CharactersCard";
import { Oval } from "react-loader-spinner";
import "../styles/Characters.css";

const Characters = ({
  searchResults,
  setSearchResults,
  currentPage,
  allSuggestions,
  setAllSuggestions,
  setCurrentPage,
  currentPageData,
  onChangeCurrentPage,
  onChangeCurrentPageData,
  userId,
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
        );
        const charactersNames = response.data?.results.map((characters) => characters.name);
        setAllSuggestions(charactersNames);

        setData(response.data.results);
        setFilteredData(response.data.results);
      } catch (error) {
        console.log(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchResults, setAllSuggestions]);
  useEffect(() => {
    if (searchResults.length > 2) {
      const filtered = data?.filter((characters) =>
        characters.name.toLowerCase().startsWith(searchResults.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchResults, data]);

  const itemsPerPage = 16;
  const indexOfFirstItem = currentPage * itemsPerPage;
  const indexOfLastItem = indexOfFirstItem + itemsPerPage;
  const currentPageCharacters = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

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
              />
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
