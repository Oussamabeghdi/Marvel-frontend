import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import "../styles/Infoscharacter.css";

const InfosCharacter = () => {
  const [data, setData] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const id = params.characterId;

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--9gtnl5qyn2yw.code.run/comics/${id}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log({ message: error.message });
      }
    };
    fetchData();
  }, [id]);
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
    <section className="infos-container">
      <div className="infos-div">
        <div className="container-title-description">
          <h2 className="title">{data?.name}</h2>
        </div>
        <img
          src={
            data?.thumbnail?.path && data?.thumbnail?.extension
              ? `${data.thumbnail.path}/standard_xlarge.${data.thumbnail.extension}`
              : "default_image_path"
          }
          alt="character"
        />
      </div>
      <h3 className="comics-list-title">
        {`Liste des comics en lien avec `}
        <span>{data?.name ? data.name.replace(/[$]/g, "") : ""}</span>
      </h3>
      <div className="comic-list">
        {data?.comics?.length > 0 ? (
          data?.comics?.map((item, id) => (
            <div className="comic-card" key={id}>
              {item?.thumbnail?.path && item?.thumbnail?.extension && (
                <Link to={`/comic/${item._id}`}>
                  <img
                    src={`${item.thumbnail.path}/portrait_xlarge.${item.thumbnail.extension}`}
                    alt={`item-${id}`}
                  />
                </Link>
              )}
              <span style={{ textAlign: "center", letterSpacing: "1px" }}>
                {item?.title.replace("#", "Issue# :")}
              </span>
            </div>
          ))
        ) : (
          <div className="empty-comics-list-container">
            <div className="empty-comics-list">
              <p>Désolé nous n'avons pas trouvé de comics.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default InfosCharacter;
