import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDeck, updateDeck } from "../utils/api";

function DeckForm({ initialFormData, deckId }) {
  const navigate = useNavigate();

  const initialFormState = {
    name: "",
    description: "",
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
    if (deckId) {
      await updateDeck(formData);
    } else {
      const deck = await createDeck(formData);
      deckId = deck.id;
    }
    navigate(`/decks/${deckId}`);
  };

  const handleCancel = () => {
    if (deckId) {
      navigate(`/decks/${deckId}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          placeholder="Deck Name"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          placeholder="Brief description of the deck"
          onChange={handleChange}
          required
        />
      </div>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleCancel}
      >
        Cancel
      </button>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default DeckForm;
