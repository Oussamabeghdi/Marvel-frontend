import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import "../styles/Infoscharacter.css";

const InfosCharacter = () => {
  const [data, setData] = useState();
  // const [, set] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  // console.log(params);
  const id = params.characterId;
  // const { comicId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--9gtnl5qyn2yw.code.run/comics/${id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log({ message: error.message });
      }
    };
    fetchData();
  }, [id]);
  return isLoading ? (
    <Oval
      ariaLabel="loading-indicator"
      height={100}
      width={100}
      strokeWidth={1000}
      strokeWidthSecondary={1000}
      color="black"
      secondaryColor="red"
    />
  ) : (
    <section className="infos-container">
      <div className="infos-div">
        <div className="container-title-description">
          <h1 className="title">{data?.name}</h1>
          {/* <p className="desciption">{data?.description}</p> */}
        </div>

        <img
          src={
            data?.thumbnail.path +
            "/portrait_xlarge" +
            "." +
            data?.thumbnail.extension
          }
          alt=""
        />
      </div>
      <h1>Liste des comics :</h1>
      <div className="comic-list">
        {data?.comics?.map((item, id) => (
          <div className="comic-card" key={id}>
            {item.thumbnail.path +
              "/portrait_xlarge." +
              item.thumbnail.extension && (
              <img
                src={
                  item.thumbnail.path +
                  "/portrait_xlarge." +
                  item.thumbnail.extension
                }
                alt={`item-${id}`}
              />
            )}
            <span>{item?.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
export default InfosCharacter;
