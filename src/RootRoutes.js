import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "./Layout/NotFound";
import Home from "./home/Home";
import DeckDetails from "./decks/DeckDetails";
import CreateDeck from "./decks/CreateDeck";
import EditDeck from "./decks/EditDeck";
import Study from "./decks/study/Study";
import AddCard from "./decks/cards/AddCard";
import EditCard from "./decks/cards/EditCard";

function RootRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/decks/new" element={<CreateDeck />} />
      <Route path="/decks/:deckId" element={<DeckDetails />} />
      <Route path="/decks/:deckId/edit" element={<EditDeck />} />
      <Route path="/decks/:deckId/study" element={<Study />} />
      <Route path="/decks/:deckId/cards/new" element={<AddCard />} />
      <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RootRoutes;
