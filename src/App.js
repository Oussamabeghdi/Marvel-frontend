import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useCallback } from "react";
import Cookies from "js-cookie";

import Characters from "./pages/Characters";
import InfosCharacter from "./pages/InfosCharacter";
import Comics from "./pages/Comics";
import ComicsList from "./pages/ComicsList";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

//components
import Header from "./components/Header";
import Footer from "./components/Footer";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";
library.add(faBars, faHeart, faXmark);

function App() {
  const [token, setToken] = useState(Cookies.get("token-user" || null));
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageData, setCurrentPageData] = useState([]);

  // const [isFavorite, setIsFavorite] = useState(false);

  // const hideSearchBar = () => {
  //   setShowSearchBar(false);
  // };

  const onChangeCurrentPageData = useCallback((pageData) => {
    setCurrentPageData(() => pageData);
  }, []);

  const onChangeCurrentPage = useCallback((value) => {
    setCurrentPage(() => value);
  }, []);

  const handleToken = (token) => {
    if (token) {
      setToken(token);

      Cookies.set("token-user", token, { expires: 28 });
    } else {
      setToken(null);

      Cookies.remove("token-user");
    }
  };

  return (
    <Router>
      <Header
        token={token}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        handleToken={handleToken}
        setToken={setToken}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />

      <Routes>
        <Route path="/" element={<Login handleToken={handleToken} />} />
        <Route
          path="/characters"
          element={
            <Characters
              searchResults={searchResults}
              currentPage={currentPage}
              onChangeCurrentPage={onChangeCurrentPage}
              currentPageData={currentPageData}
              onChangeCurrentPageData={onChangeCurrentPageData}
            />
          }
        />

        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />

        <Route
          path="/character/:characterId"
          element={<InfosCharacter searchResults={searchResults} />}
        />
        <Route path="/comic/:comicId" element={<ComicsList />} />

        <Route path="/comics/:characterId" element={<ComicsList />} />
        <Route
          path="/comics"
          element={
            <Comics
              searchResults={searchResults}
              currentPage={currentPage}
              onChangeCurrentPage={onChangeCurrentPage}
              currentPageData={currentPageData}
              onChangeCurrentPageData={onChangeCurrentPageData}
            />
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
}
export default App;
