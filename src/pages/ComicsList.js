import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ComicsList = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params.comicId;
  console.log(params.comicId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--9gtnl5qyn2yw.code.run/comic/${id}`
          // "http://localhost:4000/comic/" + id
        );
        // const character = response.data.filter((c) => c.id === parseInt(id));
        // console.log(character);
        setData(response.data);
        // console.log(response.data.results);
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
    <section>
      {data.map((elem, index) => {
        return (
          <div key={index}>
            <img
              src={elem.thumbnail.path + "." + elem.thumbnail.extension}
              alt="comics"
            />
            <p>{elem.title} </p>
            <p>{elem.description} </p>
          </div>
        );
      })}
    </section>
  );
};

export default ComicsList;
