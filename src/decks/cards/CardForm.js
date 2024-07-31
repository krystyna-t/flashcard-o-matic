import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createCard, updateCard } from "../../utils/api";

function CardForm({ initialFormData, deckId, cardId }) {
  const navigate = useNavigate();

  const initialFormState = {
    front: "",
    back: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (initialFormData) {
      setFormData(initialFormData);
    }
  }, [initialFormData]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (cardId) {
      await updateCard({ id: cardId, ...formData });
      navigate(`/decks/${deckId}`);
    } else {
      await createCard(deckId, formData);
      setFormData(initialFormState);
    }
  };

  const handleCancel = () => {
    navigate(`/decks/${deckId}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="front">Front</label>
        <textarea
          id="front"
          name="front"
          onChange={handleChange}
          value={formData.front}
          placeholder="Front side of card"
          required
        />
      </div>
      <div>
        <label htmlFor="back">Back</label>
        <textarea
          id="back"
          name="back"
          onChange={handleChange}
          value={formData.back}
          placeholder="Back side of card"
          required
        />
      </div>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleCancel}
      >
        {cardId ? "Cancel" : "Done"}
      </button>
      <button type="submit" className="btn btn-primary">
        {cardId ? "Submit" : "Save"}
      </button>
    </form>
  );
}

export default CardForm;
