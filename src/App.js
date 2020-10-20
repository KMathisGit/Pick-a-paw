import React from "react";
import "./App.scss";
import Dog from "./Dog";
import DogForm from "./DogForm";

function App() {
  const [dog, setDog] = React.useState(null);

  const pickDog = (dog) => {
    if (dog) setDog(dog);
  };

  return (
    <>
      <div className="App">
        <header>Pick-a-paw</header>
        <DogForm pickDog={pickDog} />
        {dog && <Dog dog={dog} />}
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
