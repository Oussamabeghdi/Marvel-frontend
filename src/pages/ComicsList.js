import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import "../styles/ComicsList.css";

const ComicsList = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const comicId = params.comicId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--9gtnl5qyn2yw.code.run/comic/${comicId}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchData();
  }, [comicId]);
  // const translateDescription = async () => {
  //   if (!data.description) return;
  //   setIsTranslating(true);
  //   try {
  //     const response = await axios.post(
  //       "https://api.cognitive.microsofttranslator.com/translate", // Remplacez par l'URL de l'API de traduction
  //       {
  //         text: data.description,
  //         targetLanguage: "fr", // Traduire vers le français (ou une autre langue)
  //       }
  //     );
  //     setTranslatedDescription(response.data.translatedText);
  //   } catch (error) {
  //     console.error("Erreur lors de la traduction :", error);
  //   } finally {
  //     setIsTranslating(false);
  //   }
  // };

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
    <div className="card-container">
      <div>
        <img
          className="comic-image"
          src={`${data?.thumbnail.path}/portrait_uncanny.${data?.thumbnail.extension}`}
          // src={data?.thumbnail.path + "/portrait_uncanny" + "." + data?.thumbnail.extension}
          alt="comics"
        />
        <article className="comic-container">
          <div>
            <p className="comic-title">{data?.title && data.title.replace(/#/g, "Issue# : ")}</p>
            <p className="comic-description">
              {data.description ? (
                data?.description
                  .replace(/&ndash;/g, "-")
                  .replace(/&#39;/g, "'")
                  .replace(/<br>/g, "")
                  .replace(/<br\/>/g, "")
              ) : (
                <div>Désolé ! Pas de description</div>
              )}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ComicsList;
