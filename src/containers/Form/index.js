import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 1000); })
//  fonction qui simule un appel à une API en retournant une promesse qui se résout après 1 seconde.


const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  // Cette ligne crée une variable appelée `sending` qui représente l'état d'envoi du formulaire. 
  // La valeur initiale de `sending` est `false`, ce qui signifie que le formulaire n'est pas en cours d'envoi.

  const sendContact = useCallback(
    // gère l'événement d'envoi du formulaire 

    async (evt) => {
      evt.preventDefault();
      setSending(true);
      //  met à jour sending à true, indiquant que le formulaire est en cours d'envoi.
      // We try to call mockContactApi

      try {
        await mockContactApi();

        // onSuccess n'est pas appelé
        // rajout de onSuccess
        onSuccess();

        setSending(false);
        // Cette ligne met à jour la valeur de la variable `sending` à `false` pour indiquer que le formulaire a été envoyé avec succès.

      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );


  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
