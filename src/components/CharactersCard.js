import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ReactComponent as Heart } from "../assets/svg/heart.svg";
import axios from "axios";

const CharactersCard = ({ item, userId, setSearchResults }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    (async () => {
      const favoritesData = await axios.get(
        `https://site--marvel-backend--9gtnl5qyn2yw.code.run/users/${userId}/favorites/characters`
      );
      const isFavorite = favoritesData.data?.includes(item._id);

      setIsFavorite(isFavorite);
    })();
  }, [item._id, userId]);

  const onAddFavorite = async () => {
    if (isFavorite) return;

    const characterId = item._id;

    const response = await axios.put(
      `https://site--marvel-backend--9gtnl5qyn2yw.code.run/users/${userId}/favorites/characters/${characterId}`
    );

    const characterFavorites = response.data;
    if (characterFavorites.includes(characterId)) {
      setIsFavorite(true);
    }
  };

  const onRemoveFavorite = async () => {
    if (!isFavorite) return;

    const characterId = item._id;

    const response = await axios.delete(
      `https://site--marvel-backend--9gtnl5qyn2yw.code.run/users/${userId}/favorites/characters/${characterId}`
    );

    const characterFavorites = response.data;
    if (!characterFavorites.includes(characterId)) {
      setIsFavorite(false);
    }
  };

  const picture = item?.thumbnail?.path + "." + item?.thumbnail?.extension;

  return (
    <section>
      <div className="card-wrapper">
        <Link
          className="character-link"
          to={`/character/${item._id}`}
          onClick={() => setSearchResults("")}
        >
          <div className="details-wrapper">
            <p className="character-name">{item?.name}</p>
            <img className="image-character" src={picture} alt="heros" />
            <p className="character-description">{item.description || "Pas de description."}</p>
          </div>
        </Link>
        <Heart
          className="card-heart"
          style={{ fill: isFavorite ? "red" : "white", cursor: "pointer" }}
          onClick={async () => (isFavorite ? onRemoveFavorite() : onAddFavorite())}
          // onClick={isFavorite ? onRemoveFavorite : onAddFavorite}
        />
      </div>
    </section>
  );
};

export default CharactersCard;
