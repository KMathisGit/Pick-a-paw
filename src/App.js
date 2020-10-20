import React from "react";
import "./App.scss";
import Dog from "./Dog";
import DogForm from "./DogForm";
import { useLocalStorageState } from "./utils";

function App() {
  const [favorites, setFavorites] = useLocalStorageState(
    "pickapaw:favorites",
    []
  );
  const [dog, setDog] = React.useState(null);

  const toggleFavorite = (event, dogId) => {
    event.stopPropagation();
    const _favorites = [...favorites];
    const favoriteIndex = favorites.findIndex((id) => id === dogId);
    favoriteIndex > -1
      ? _favorites.splice(favoriteIndex, 1)
      : _favorites.push(dogId);
    setFavorites(_favorites);
  };

  const pickDog = (dog) => {
    if (dog) setDog(dog);
  };

  return (
    <>
      <div className="App">
        <header>Pick-a-paw</header>
        <DogForm
          pickDog={pickDog}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
        {dog && (
          <Dog
            dog={dog}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        )}
      </div>
      <footer>
        <p>
          © <span>{new Date().getFullYear()}</span> Kevin M. All rights reserved
        </p>
        <p>Powered by TheDogAPI</p>
      </footer>
    </>
  );
}

export default App;
