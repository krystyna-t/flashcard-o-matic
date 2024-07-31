import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { readDeck } from "../../utils/api";
import NotEnoughCards from "./NotEnoughCards";

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();
    if (deckId) {
      readDeck(deckId, abortController.signal)
        .then(setDeck)
        .catch((error) => console.error(`Error loading deck: ${error}`));
      return () => abortController.abort();
    }
  }, [deckId]);

  const handleFlipCard = () => {
    setIsCardFlipped(!isCardFlipped);
  };

  const handleNextCard = () => {
    setIsCardFlipped(false);
    if (currentCardIndex === cardsLength - 1) {
      handleRestartDeck();
    } else {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handleRestartDeck = () => {
    const confirmRestart = window.confirm(
      "Restart cards?\n\nClick 'cancel' to return to the home page."
    );
    if (confirmRestart) {
      setCurrentCardIndex(0);
    } else {
      navigate("/");
    }
  };

  const cardsLength = deck.cards ? deck.cards.length : 0;

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h1>Study: {deck.name}</h1>
      {cardsLength > 2 ? (
        <div className="card-study">
          <div>
            <h5>
              Card {currentCardIndex + 1} of {cardsLength}
            </h5>
            <p>
              {isCardFlipped
                ? deck.cards[currentCardIndex].back
                : deck.cards[currentCardIndex].front}
            </p>
          </div>
          <button className="btn btn-secondary" onClick={handleFlipCard}>
            Flip
          </button>
          {isCardFlipped && (
            <button className="btn btn-primary" onClick={handleNextCard}>
              Next
            </button>
          )}
        </div>
      ) : (
        <NotEnoughCards cardsLength={cardsLength} deckId={deckId} />
      )}
    </div>
  );
}

export default Study;
