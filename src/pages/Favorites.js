import "../styles/Favorites.css";
import { useEffect, useState } from "react";
import axios from "axios";
import FavoriteCard from "../components/FavoriteCard";
import { Oval } from "react-loader-spinner";

const CHARACTERS = "characters";
const COMICS = "comics";

export const Favorites = ({
  userId,
  currentPage,
  onChangeCurrentPage,
  onChangeCurrentPageData,
}) => {
  const [selectedValue, setSelectedValue] = useState(CHARACTERS);
  const [favoritesIdData, setFavoritesIdData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      (async () => {
        try {
          const response = await axios.get(
            `https://site--marvel-backend--9gtnl5qyn2yw.code.run/users/${userId}/favorites/${selectedValue}`
          );
          setFavoritesIdData(response.data);
          setIsLoading(false);
        } catch (err) {
          console.log(err.message);
        }
      })();
    }
  }, [userId, selectedValue]);

  const onChangeSelectedValue = (value) => {
    setSelectedValue(value);
  };

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
    <div className="favorites-wrapper">
      <div className="selected-wrapper">
        <label className="selected-label" htmlFor="selected-type">
          Choose your type:
        </label>
        <select
          value={selectedValue}
          onChange={(event) => onChangeSelectedValue(event.target.value)}
          name="types"
          id="selected-type"
          className={"selected-type"}
        >
          <option value="">--Choose your type--</option>
          <option value={CHARACTERS}>Characters</option>
          <option value={COMICS}>Comics</option>
        </select>
      </div>
      <div className="characters-container">
        {favoritesIdData?.length ? (
          favoritesIdData?.map((favoriteId) => (
            <FavoriteCard
              key={`favorites: ${favoriteId}`}
              type={selectedValue}
              elementId={favoriteId}
            />
          ))
        ) : (
          <p className="container-text">You don't have any favorites yet.</p>
        )}
      </div>
    </div>
  );
};
