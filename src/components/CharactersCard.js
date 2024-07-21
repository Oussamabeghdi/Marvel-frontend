import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ReactComponent as Heart } from "../assets/svg/heart.svg";
import axios from "axios";

// Composant CharactersCard, prenant item et userId comme props

const CharactersCard = ({ item, userId }) => {
  // Déclaration de l'état pour suivre si le personnage est en favori
  const [isFavorite, setIsFavorite] = useState(false);
  // Utilisé pour vérifier si le personnage est en favori au montage du composant.
  useEffect(() => {
    (async () => {
      // Requête pour obtenir les personnages favoris de l'utilisateur
      const favoritesData = await axios.get(
        `https://site--marvel-backend--9gtnl5qyn2yw.code.run/users/${userId}/favorites/characters`
      );
      // Vérifie si l'item actuel est dans les favoris
      const isFavorite = favoritesData.data?.includes(item._id);
      // Met à jour l'état isFavorite

      setIsFavorite(isFavorite);
    })();
  }, [item._id, userId]); // Dépendances de l'effet

  // Fonction pour ajouter le personnage aux favoris

  const onAddFavorite = async () => {
    // Si déjà favori, ne fait rien
    if (isFavorite) return;

    const characterId = item._id;
    // Requête pour ajouter le personnage aux favoris de l'utilisateur

    const response = await axios.put(
      `https://site--marvel-backend--9gtnl5qyn2yw.code.run/users/${userId}/favorites/characters/${characterId}`
    );
    // Met à jour l'état si l'ajout est réussi

    const characterFavorites = response.data;
    if (characterFavorites.includes(characterId)) {
      setIsFavorite(true);
    }
  };
  // Fonction pour enlever le personnage des favoris

  const onRemoveFavorite = async () => {
    // Si pas en favori, ne fait rien
    if (!isFavorite) return;

    const characterId = item._id;
    // Requête pour enlever le personnage des favoris de l'utilisateur

    const response = await axios.delete(
      `https://site--marvel-backend--9gtnl5qyn2yw.code.run/users/${userId}/favorites/characters/${characterId}`
    );
    // Met à jour l'état si la suppression est réussie

    const characterFavorites = response.data;
    if (!characterFavorites.includes(characterId)) {
      setIsFavorite(false);
    }
  };
  // Construire l'URL de l'image du personnage

  const picture = item.thumbnail.path + "." + item.thumbnail.extension;
  // Retourne le JSX pour afficher la carte du personnage

  return (
    <section>
      <div className="card-wrapper">
        <Link className="character-link" to={`/character/${item._id}`}>
          <div className="details-wrapper">
            <p className="character-name">{item.name}</p>
            <img className="image-character" src={picture} alt="heros" />
            <p className="character-description">
              {item.description || "Pas de description."}
            </p>
          </div>
        </Link>
        <Heart
          //
          className="card-heart"
          //J'utilise une condition ternaire pour déterminer quelle fonction appeler en fonction de la valeur de isFavorite.
          // Si isFavorite est true, cela signifie que le personnage est déjà marqué comme favori, donc la fonction onRemoveFavorite() est appelée pour le retirer des favoris.
          // Si isFavorite est false, cela signifie que le personnage n'est pas encore favori, donc la fonction onAddFavorite() est appelée pour l'ajouter aux favoris.
          //fill dans svg correspond a la propriete couleur
          // Si la variable isFavorite est true, la couleur de remplissage sera rouge ("red").
          // Si isFavorite est false, la couleur de remplissage sera blanche ("white").
          style={{ fill: isFavorite ? "red" : "white", cursor: "pointer" }}
          onClick={async () =>
            isFavorite ? onRemoveFavorite() : onAddFavorite()
          }
        />
      </div>
    </section>
  );
};

export default CharactersCard;
