import React, { createContext, useContext, useState } from 'react';

const FavouriteContext = createContext<{
  favourites: string[];
  toggleFavourite: (id: string) => void;
}>({
  favourites: [],
  toggleFavourite: () => {},
});

export const FavouriteProvider = ({ children }: { children: React.ReactNode }) => {
  const [favourites, setFavourites] = useState<string[]>([]);

  const toggleFavourite = (id: string) => {
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <FavouriteContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouriteContext);
