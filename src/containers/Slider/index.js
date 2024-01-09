import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  // obtenir des données liées aux événements.

  const [index, setIndex] = useState(0);
  //  gére l'index de la carte actuellement affichée dans le slider (index).

  const byDateDesc = data?.focus.sort((evtA, evtB) =>

    // inverser le sens de tri en changeant le >
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

  const nextCard = () => {
   
    // verifier si superieur à 0 alors
    if (byDateDesc && byDateDesc.length > 0) {

      setTimeout(
        // Ajout pour vérifier la prochaine carte à afficher est la dernière 
        // Si l'index est inférieur à la longueur de byDateDesc moins 1, l'index est augmenté de 1, sinon il est réinitialisé à 0.
        () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
        5000
      );
    }
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList" data-testid="testSlideCardList">
      {byDateDesc?.map((event, idx) => (
        // Les événements sont affichés en utilisant la méthode map() sur byDateDesc, 

        // créant des éléments HTML pour chaque événement avec leurs images, titres, descriptions et dates.
        <div key={event.title}>
          <div

            className={`SlideCard SlideCard--${index === idx ? "display" : "hide"
              }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>

          {/* pagination */}
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination" data-testid="SlideCard__pagination">


              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={_.date}
                  type="radio"
                  name="radio-button"
                  // idx index de l'élément dans  byDataDesc en index. index de la carte du slider
                  checked={index === radioIdx}
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
