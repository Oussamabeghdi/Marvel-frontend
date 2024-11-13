import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ReactComponent as Heart } from "../assets/svg/heart.svg";
import axios from "axios";

const ComicsCard = ({ item, userId, setSearchResults }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    (async () => {
      const favoritesData = await axios.get(
        `https://site--marvel-backend--9gtnl5qyn2yw.code.run/users/${userId}/favorites/comics`
      );
      const isFavorite = favoritesData.data?.includes(item._id);

      setIsFavorite(isFavorite);
    })();
  }, [item._id, userId]);

  const onAddFavorite = async () => {
    if (isFavorite) return;

    const comicId = item._id;

    const response = await axios.put(
      `https://site--marvel-backend--9gtnl5qyn2yw.code.run/users/${userId}/favorites/comics/${comicId}`
    );

    const comicFavorites = response.data;
    if (comicFavorites.includes(comicId)) {
      setIsFavorite(true);
    }
  };

  const onRemoveFavorite = async () => {
    if (!isFavorite) return;

    const comicId = item._id;

    const response = await axios.delete(
      `https://site--marvel-backend--9gtnl5qyn2yw.code.run/users/${userId}/favorites/comics/${comicId}`
    );

    const comicFavorites = response.data;
    if (!comicFavorites.includes(comicId)) {
      setIsFavorite(false);
    }
  };
  return (
    <section>
      <div className="card-wrapper">
        <Link
          className="character-link"
          to={`/comic/${item._id}`}
          onClick={() => setSearchResults("")}
        >
          <div className="details-wrapper">
            <p className="comics-title ">{item.title.replace("#", "edition ")}</p>

            <img
              className="comics-image"
              src={item.thumbnail.path + "." + item.thumbnail.extension}
              alt="comics "
            />
            <p className="comics-description ">{item.description || "Pas de description."}</p>
          </div>
        </Link>
        <Heart
          className="card-heart"
          style={{ fill: isFavorite ? "red" : "white", cursor: "pointer" }}
          // onClick={isFavorite ? onRemoveFavorite : onAddFavorite}
          onClick={async () => (isFavorite ? onRemoveFavorite() : onAddFavorite())}
        />
      </div>
    </section>
  );
};

export default ComicsCard;
