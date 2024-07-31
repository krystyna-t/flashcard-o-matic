import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks } from "../utils/api";
import DeckList from "../decks/DeckList";

function Home() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal)
      .then(setDecks)
      .catch((error) => console.error(`Failed to read decks: ${error}`));
    return () => abortController.abort();
  }, []);

  return (
    <>
      <div>
        <Link to="/decks/new">
          <button type="button" className="btn btn-secondary oi oi-plus">
            Create Deck
          </button>
        </Link>
      </div>
      <DeckList decks={decks} />
    </>
  );
}

export default Home;
