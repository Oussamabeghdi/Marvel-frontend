import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { ReactComponent as Heart } from "../assets/svg/heart.svg";
import axios from "axios";

const FavoriteCard = ({ type, elementId }) => {
  const [data, setData] = useState({});

  const currentType = type?.slice(0, -1);
  // console.log(currentType);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--9gtnl5qyn2yw.code.run/${currentType}/${elementId}`
        );
        const data = response.data;
        setData(data);
        // setIsLoading(false);
      } catch (error) {
        console.log(error.response.data.message, "ici");
      }
    };
    fetchData();
  }, [currentType, elementId]);

  const picture = useMemo(() => data?.thumbnail?.path + "." + data?.thumbnail?.extension, [data]);

  return (
    // isLoading ? (
    //   <div className="loading-wrapper">
    //     <Oval
    //       ariaLabel="loading-indicator"
    //       height={50}
    //       width={50}
    //       strokeWidth={1000}
    //       strokeWidthSecondary={1000}
    //       color="black"
    //       secondaryColor="red"
    //     />
    //   </div>
    // ) : (
    <section>
      <div className="card-wrapper">
        <Link className="character-link" to={`/${currentType}/${data?._id}`}>
          <div className="details-wrapper">
            <p className="character-name">{data?.name || data?.title}</p>
            <img className="image-character" src={picture} alt="heros" />
            <p className="character-description">{data?.description || "Pas de description."}</p>
          </div>
        </Link>
        <Heart className="card-heart" style={{ fill: "red" }} />
      </div>
    </section>
  );
};

export default FavoriteCard;
