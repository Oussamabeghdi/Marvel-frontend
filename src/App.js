import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useCallback } from "react";
import Cookies from "js-cookie";

//Pages
import Characters from "./pages/Characters";
import InfosCharacter from "./pages/InfosCharacter";
import Comics from "./pages/Comics";
import ComicsList from "./pages/ComicsList";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

//components
import Header from "./components/Header";
import Footer from "./components/Footer";
import ButtonScrollToTop from "./components/ButtonScrollToTop";

import { library } from "@fortawesome/fontawesome-svg-core";
// import { all } from "@awesome.me/kit-KIT_CODE/icons";

import {
  faBars,
  faHeart,
  faXmark,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Favorites } from "./pages/Favorites";

library.add(faBars, faHeart, faXmark, faMagnifyingGlass, faUser);
// library.add(...all);

function App() {
  // Récupération des cookies
  const [token, setToken] = useState(Cookies.get("token-user" || null));
  const [userId, setUserId] = useState(Cookies.get("userId" || null));

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [allSuggestions, setAllSuggestions] = useState([]);
  //  state pour gérer la section actuelle
  // const [currentSection, setCurrentSection] = useState("characters");

  const onChangeCurrentPageData = useCallback((pageData) => {
    setCurrentPageData(() => pageData);
  }, []);

  const onChangeCurrentPage = useCallback((value) => {
    setCurrentPage(() => value);
  }, []);

  const handleTokenAndId = (token, userId) => {
    if (token && userId) {
      setToken(token);
      setUserId(userId);
      // Stockage des cookies
      Cookies.set("token-user", token, { expires: 8 });
      Cookies.set("userId", userId, { expires: 8 });
    } else {
      setToken(null);
      setUserId(null);
      // Suppression des cookies
      Cookies.remove("token-user");
      Cookies.remove("userId");
    }
  };

  return (
    <div className="app-wrapper">
      {/* Définition du router pour gérer la navigation entre les pages */}

      <Router>
        {/* Header avec plusieurs props pour la gestion de la connexion et de la recherche */}
        <Header
          token={token}
          userId={userId}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          suggestions={suggestions}
          setSuggestions={setSuggestions}
          allSuggestions={allSuggestions}
          setAllSuggestions={setAllSuggestions}
          handleTokenAndId={handleTokenAndId}
          setToken={setToken}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
        {/* Routes définissant les pages de l'application */}
        <Routes>
          {/* Route pour la page de connexion */}
          <Route path="/" element={<Login token={token} handleTokenAndId={handleTokenAndId} />} />
          {/* Route pour la page d'inscription */}
          <Route path="/signup" element={<Signup handleTokenAndId={handleTokenAndId} />} />
          {/* Route alternative pour la page de connexion */}
          <Route path="/login" element={<Login handleTokenAndId={handleTokenAndId} />} />
          {/* Route pour la page de profil */}
          {/* Route pour la page de personnages Marvel */}
          <Route
            path="/characters"
            element={
              <Characters
                userId={userId}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                onChangeCurrentPage={onChangeCurrentPage}
                onChangeCurrentPageData={onChangeCurrentPageData}
                handleTokenAndId={handleTokenAndId}
                setAllSuggestions={setAllSuggestions}
              />
            }
          />
          {/* Route pour la page des comics */}
          <Route path="/character/:characterId" element={<InfosCharacter />} />
          <Route
            path="/comics/:characterId"
            element={<InfosCharacter searchResults={searchResults} />}
          />
          <Route
            path="/comics"
            element={
              <Comics
                userId={userId}
                searchResults={searchResults}
                setAllSuggestions={setAllSuggestions}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                onChangeCurrentPage={onChangeCurrentPage}
                currentPageData={currentPageData}
                onChangeCurrentPageData={onChangeCurrentPageData}
              />
            }
          />
          <Route
            path="/profile"
            element={<Profile token={token} userId={userId} handleTokenAndId={handleTokenAndId} />}
          />
          {/* Route pour la page de détails d'un personnage spécifique */}
          {/* Route pour la page de détails d'un comic spécifique */}
          <Route path="/comic/:comicId" element={<ComicsList />} />
          {/* Route pour la page des favoris */}
          <Route
            path="/favorites"
            element={
              <Favorites
                userId={userId}
                currentPage={currentPage}
                onChangeCurrentPage={onChangeCurrentPage}
                onChangeCurrentPageData={onChangeCurrentPageData}
              />
            }
          />
        </Routes>
        {/* Bouton pour remonter en haut de la page */}
        <ButtonScrollToTop />
        {/* Pied de page avec gestion de la déconnexion */}
        <Footer token={token} setToken={setToken} />
      </Router>
    </div>
  );
}

export default App;
