import { CircularProgress } from "@material-ui/core";
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
  const { dog } = props;
  const [image, setImage] = React.useState(null);

  React.useEffect(() => {
    // setImage(null);
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
    <div className="dog-card-container">
      {image && (
        <div className="img-container">
          <img src={image} />
        </div>
      )}
      <div className="dog-stats">
        <div>
          <label>Name</label>
          <div>{dog.name}</div>
        </div>
        {dog.origin && (
          <div>
            <label>Origin</label>
            <div>{dog.origin}</div>
          </div>
        )}
        <div>
          <label>Weight</label>
          <div>{displayWeight(dog.weight)}</div>
        </div>
        <div>
          <label>Height</label>
          <div>{displayHeight(dog.height)}</div>
        </div>
        <div>
          <label>Life span</label>
          <div>{dog.life_span}</div>
        </div>
        <div>
          <label>Temperament</label>
          <div>{dog.temperament}</div>
        </div>

        <div>
          <label>Great for</label>
          <div>{dog.bred_for}</div>
        </div>
      </div>
    </div>
  );
}

export default Dog;
