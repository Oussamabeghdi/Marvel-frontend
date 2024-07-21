import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import "../styles/Infoscharacter.css";

const InfosCharacter = () => {
  // Déclare un état pour stocker les données du personnage

  const [data, setData] = useState();
  // Déclare un état pour indiquer si les données sont en cours de chargement

  const [isLoading, setIsLoading] = useState(false);
  // Récupère les paramètres de l'URL

  const params = useParams();
  const id = params.characterId;

  useEffect(() => {
    // Déclare une fonction asynchrone pour récupérer les données

    const fetchData = async () => {
      try {
        // Effectue une requête pour obtenir les données du personnage depuis l'API

        const response = await axios.get(
          `https://site--marvel-backend--9gtnl5qyn2yw.code.run/comics/${id}`
        );
        console.log(response.data);

        // Met à jour l'état avec les données reçues
        setData(response.data);
        // Indique que le chargement est terminé
        setIsLoading(false);

        // Affiche un message d'erreur en cas de problème
      } catch (error) {
        console.log({ message: error.message });
      }
    };
    // Appelle la fonction pour récupérer les données
    fetchData();

    // Exécute cet effet chaque fois que l'identifiant du personnage (id) change
  }, [id]);

  // J'affiche un indicateur de chargement si les données sont en cours de chargement
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
    // Affiche les informations du personnage une fois les données chargées

    <section className="infos-container">
      <div className="infos-div">
        <div className="container-title-description">
          {/*  j'affiche le nom qui se trouve dans l'objet data en utilisant
          l'operateur d'enchainement optionnel '?' */}
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
      <h1 style={{ letterSpacing: "1px" }}>Liste des comics :</h1>
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
            <span style={{ textAlign: "center", letterSpacing: "1px" }}>
              {item?.title.replace("#", "edition :")}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
export default InfosCharacter;
