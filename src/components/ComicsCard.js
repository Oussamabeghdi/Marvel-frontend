import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ReactComponent as Heart } from "../assets/svg/heart.svg";

const ComicsCard = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Récupération des favoris actuels de l'utilisateur depuis Local Storage
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isAlreadyFavorite = favorites.includes(item._id);

    setIsFavorite(isAlreadyFavorite);
  }, [item]);

  const onAddFavoriteInLocalStorage = () => {
    if (!isFavorite) {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      // Ajouter le personnage aux favoris
      const newFavorites = [...favorites, item._id];

      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
    setIsFavorite(true);
  };

  const onRemoveFavorite = () => {
    if (isFavorite) {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      // Supprimer le personnage des favoris
      const newFavorites = favorites.filter(
        (favorite) => favorite !== item._id
      );

      localStorage.setItem("favorites", JSON.stringify(newFavorites));

      return setIsFavorite(false);
    }
  };
  return (
    // <article className="comics">
    <section>
      <div className="card-wrapper">
        <Link className="character-link" to={`/comic/${item._id}`}>
          <div className="details-wrapper">
            <p className="comics-title ">{item.title}</p>

            {/* </div> */}
            {/* <div className="comics-image-container"> */}
            <img
              className="comics-image"
              src={item.thumbnail.path + "." + item.thumbnail.extension}
              alt="comics "
            />
            <p className="comics-description ">
              {item.description || "Pas de description."}
            </p>
          </div>
        </Link>
        <Heart
          className="card-heart"
          style={{ fill: isFavorite ? "red" : "white" }}
          onClick={isFavorite ? onRemoveFavorite : onAddFavoriteInLocalStorage}
        />
        {/* <button
        onClick={isFavorite ? onRemoveFavorite : onAddFavoriteInLocalStorage}
      >
        <FontAwesomeIcon icon="heart" color={isFavorite ? "red" : "gray"} />
      </button> */}
      </div>
    </section>
  );
};

export default ComicsCard;
