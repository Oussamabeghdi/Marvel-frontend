import { useEffect, useState } from "react";
import axios from "axios";
import Paginate from "../components/Paginate";
import { Oval } from "react-loader-spinner";
import ComicsCard from "../components/ComicsCard";
import "../styles/Comics.css";

const Comics = ({
  searchResults,
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
  useEffect(() => {
    setCurrentPage(0);
  }, [setCurrentPage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--9gtnl5qyn2yw.code.run/comics?title=${searchResults}`
        );
        const comicsTitles = response.data.results.map((comics) => comics.title);
        setAllSuggestions(comicsTitles);
        console.log(response.data);
        setData(response.data);
        setIsloading(false);
      } catch (error) {
        console.log({ message: error.message });
      }
    };
    fetchData();
  }, [searchResults, setAllSuggestions]);

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
        {currentPageData.map((item, index) => {
          return <ComicsCard item={item} key={index} userId={userId} />;
        })}
      </div>
      <div className="paginate-comics">
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

export default Comics;
