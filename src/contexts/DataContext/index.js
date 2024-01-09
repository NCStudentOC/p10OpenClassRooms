import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);


  const getData = useCallback(async () => {

    try {
      // Appel à la méthode loadData de l'objet api pour charger les données
      setData(await api.loadData());

    } catch (err) {
      setError(err);
    }
  }, []);


  // // trie les événements par date
  // et en récupérant le premier élément de la liste triée (qui est le dernier événement).
  const last = data && data.events ? data.events
    .filter(event => event.date)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
  [0]
    : null


  useEffect(() => {
    if (data) return;
    getData();
  });

  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        // Ajout de last la dernière date 
        // pour  y avoir accès partout
        last
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
