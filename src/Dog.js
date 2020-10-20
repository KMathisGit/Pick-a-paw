import { Button } from "@material-ui/core";
import React from "react";
import { getDogImage } from "./api";
import "./Dog.scss";

const displayWeight = (weight) => {
  if (isNaN(weight.max)) return `${weight.min} lbs`;
  else return `${weight.min} to ${weight.max} lbs.`;
};

const displayHeight = (height) => {
  if (isNaN(height.max)) return `${height.min} in.`;
  else return `${height.min} to ${height.max} in.`;
};

function Dog(props) {
  const { dog, favorites, toggleFavorite } = props;
  const [image, setImage] = React.useState(null);
  const isFavorited = favorites.includes(dog.id);

  React.useEffect(() => {
    getDogImage(dog.id)
      .then((response) => {
        setImage(response.data[0].url);
      })
      .catch((e) => {
        throw new Error(e.message);
      });
  }, [dog]);

  if (!dog) return null;

  return (
    <>
      <div className="dog-card-container">
        {image && (
          <div className="img-container">
            <img src={image} />
          </div>
        )}
        <div className="dog-stats">
          {dog.name && (
            <div>
              <label>Name</label>
              <div>{dog.name}</div>
            </div>
          )}
          {dog.origin && (
            <div>
              <label>Origin</label>
              <div>{dog.origin}</div>
            </div>
          )}
          {dog.weight && (
            <div>
              <label>Weight</label>
              <div>{displayWeight(dog.weight)}</div>
            </div>
          )}
          {dog.height && (
            <div>
              <label>Height</label>
              <div>{displayHeight(dog.height)}</div>
            </div>
          )}
          {dog.life_span && (
            <div>
              <label>Life span</label>
              <div>{dog.life_span}</div>
            </div>
          )}
          {dog.temperament && (
            <div>
              <label>Temperament</label>
              <div>{dog.temperament}</div>
            </div>
          )}
          {dog.bred_for && (
            <div>
              <label>Great for</label>
              <div>{dog.bred_for}</div>
            </div>
          )}
        </div>
      </div>
      <Button
        variant="contained"
        style={{
          width: "100%",
          maxWidth: "300px",
          fontWeight: "bold",
          color: "#fff",
          background: "hotpink",
          display: "block",
          margin: "16px auto",
        }}
        onClick={(e) => toggleFavorite(e, dog.id)}
      >
        {isFavorited ? "Unfavorite" : "Favorite"}
      </Button>
    </>
  );
}

export default Dog;
