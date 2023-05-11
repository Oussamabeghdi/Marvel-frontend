import { useEffect, useState } from "react";
import axios from "axios";
import Paginate from "../components/Paginate";
import { Oval } from "react-loader-spinner";
import CharactersCard from "../components/CharactersCard";
import "../styles/Characters.css";

const Characters = ({
  searchResults,
  currentPage,
  setCurrentPage,
  currentPageData,
  onChangeCurrentPage,
  onChangeCurrentPageData,
  userId,
}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--9gtnl5qyn2yw.code.run/characters?name=${searchResults}`
        );

        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    fetchData();
  }, [searchResults]);

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
    <section className="wrapper-characters">
      <div className="characters-container">
        {currentPageData.map((character) => {
          return (
            <CharactersCard
              key={character._id}
              item={character}
              userId={userId}
            />
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
  );
};

export default Characters;
