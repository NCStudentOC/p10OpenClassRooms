import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  // useData() récupère les données d'événements et erreurs. Les événements sont stockés dans data.events.

  const [type, setType] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  // est utilisé pour initialiser deux états: type pour stocker le type d'événement actuellement sélectionné 
  // et currentPage pour suivre la page actuelle.

  // Aucun type n'est selectionné dans la suite



  const filteredEvents = ((!type
    ? data?.events :
    //  filtre les événements en ne conservant que ceux dont le type correspond au type spécifié.
    data?.events.filter((event) => event.type === type))
    || []

  ).filter((event, index) => {
    // Cette fonction de callback ne traite pas la valeur de l'élément du tableau, mais uniquement son index. 
    if (
      (currentPage - 1) * PER_PAGE <= index &&
      PER_PAGE * currentPage > index
    ) {
      return true;
    }
    return false;
  });
  // filteredEvents filtre les événements en fonction de la page actuelle et du type sélectionné.
  // Si aucun type n'est sélectionné (!type), tous les événements sont récupérés, sinon les événements correspondant au type sélectionné sont récupérés.


  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };
  // La fonction changeType met à jour la page actuelle à 1 et le type d'événement en fonction du type sélectionné.

  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
  // pageNumber calcule le nombre de pages nécessaires en fonction du nombre total d'événements filtrés et de la pagination fixée à 9 événements par page.

  const typeList = new Set(data?.events.map((event) => event.type));
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
