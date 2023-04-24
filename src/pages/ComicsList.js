import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ComicsList.css";

const ComicsList = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params.comicId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--9gtnl5qyn2yw.code.run/comic/${id}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log({ message1: error.message });
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="card-container">
      <div>
        <img
          className="comic-image"
          src={
            data?.thumbnail.path +
            "/portrait_uncanny" +
            "." +
            data?.thumbnail.extension
          }
          alt="comics"
        />
        <div className="container">
          <p className="comic-title">{data?.title} </p>
          <div className="description-container">
            <p className="comic-description">{data?.description} </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicsList;
