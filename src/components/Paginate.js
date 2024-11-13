import { useEffect, useMemo } from "react";
import ReactPaginate from "react-paginate";
import "../styles/Paginate.css";

const Paginate = ({
  data, //Les données complètes que je souhaite paginer.
  itemsPerPage, //Le nombre d'éléments à afficher par page.
  onChangeCurrentPageData, // Une fonction qui reçoit les données à afficher sur la page courante.
  currentPage, // La page actuellement sélectionnée.
  onChangeCurrentPage, //Une fonction pour changer la page actuelle.
}) => {
  const onPageChange = ({ selected }) => {
    onChangeCurrentPage(selected);
  };

  const pageCount = useMemo(
    () => Math.ceil(data?.length / itemsPerPage) || 0,
    [data?.length, itemsPerPage]
  );
  const startDisplay = useMemo(() => currentPage * itemsPerPage, [currentPage, itemsPerPage]);
  const endDisplay = useMemo(() => startDisplay + itemsPerPage, [startDisplay, itemsPerPage]);
  // useMemo(() => {
  //   const pageData = data.slice(startDisplay, endDisplay);
  //   // onChangeCurrentPageData(pageData);
  //   // console.log(pageData);
  //   return pageData;
  // }, [data, endDisplay, startDisplay]);
  const pageData = useMemo(
    () => data.slice(startDisplay, endDisplay),
    [data, startDisplay, endDisplay]
  );
  //appele de la fonction seulement lorsque pageData change, évitant ainsi la mise à jour d'un état du parent pendant le rendu de l'enfant.
  useEffect(() => {
    onChangeCurrentPageData(pageData);
  }, [pageData, onChangeCurrentPageData]);
  return (
    <ReactPaginate
      pageCount={pageCount}
      marginPagesDisplayed={3}
      pageRangeDisplayed={3}
      onPageChange={onPageChange}
      activeClassName="item active"
      breakClassName="item"
      containerClassName="pagination"
      disabledClassName="disabled-page"
      nextClassName="item next"
      pageClassName="item pagination-page"
      previousClassName="item previous"
    />
  );
};

export default Paginate;

//Utilisation de useMemo pour calculer le nombre total de pages, basé sur la longueur des données
//et le nombre d'éléments par page. Le résultat est mémorisé et recalculé uniquement si data ou itemsPerPage change.
//useMemo pour optimiser les calculs (comme le nombre de pages
//et les indices de début/fin des éléments) afin de ne pas les recalculer inutilement à chaque rendu.
