import React, { useEffect, useState, createContext, useContext } from "react";
import Nav from "./components/nav";
import Gallery from "./components/gallery";
import Fav from "./components/fav";

// -------------------- Create Context --------------------
const FavContext = createContext();

// ✅ Custom hook to use favourites context
export const useFavContext = () => {
  const context = useContext(FavContext);
  if (!context) throw new Error("useFavContext must be used within a FavProvider");
  return context;
};

// -------------------- Context Provider --------------------
function FavProvider({ children }) {
  const [showFav, setShowFav] = useState(false);
  const [favourites, setFavourites] = useState([]);

  // Load stored favourites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("favourites");
    if (stored) setFavourites(JSON.parse(stored));
  }, []);

  // Add image to favourites
  const addToFav = (image) => {
    setFavourites((prev) => {
      if (prev.some((fav) => fav.id === image.id)) return prev; // avoid duplicates
      const updated = [...prev, image];
      localStorage.setItem("favourites", JSON.stringify(updated));
      return updated;
    });
  };

  // Remove image from favourites
  const removeFromFav = (id) => {
    setFavourites((prev) => {
      const updated = prev.filter((img) => img.id !== id);
      localStorage.setItem("favourites", JSON.stringify(updated));
      return updated;
    });
  };

  const value = {
    showFav,
    setShowFav,
    favourites,
    addToFav,
    removeFromFav,
  };

  return <FavContext.Provider value={value}>{children}</FavContext.Provider>;
}

// -------------------- Main App --------------------
function MainApp() {
  const { showFav, setShowFav, favourites, addToFav, removeFromFav } =
    useFavContext();

  return (
    <>
      {/* ✅ Nav now uses context, but keeping props for compatibility */}
      <Nav onShowFav={() => setShowFav(true)} favourites={favourites} />

      {/* ✅ Gallery also connects with context */}
      <Gallery
        addToFav={addToFav}
        removeFromFav={removeFromFav}
        favourites={favourites}
      />

      {/* ✅ Favourites popup */}
      {showFav && (
        <Fav
          onClose={() => setShowFav(false)}
          favourites={favourites}
          removeFromFav={removeFromFav}
        />
      )}
    </>
  );
}

// -------------------- Export Root App --------------------
export default function App() {
  return (
    <FavProvider>
      <MainApp />
    </FavProvider>
  );
}
