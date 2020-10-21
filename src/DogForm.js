import React, { useEffect } from "react";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Typography,
} from "@material-ui/core";
import { getBreedList } from "./api";
import PawSlider from "./PawSlider";
import "./DogForm.scss";
import { useLocalStorageState } from "./utils";

let ALL_DOGS = null;
const WEIGHT_RANGE = [2, 200];
const HEIGHT_RANGE = [5, 40];

// convert height and weight strings to min/max vals so we can filter easily
const restructureData = (dogs) => {
  dogs.forEach((d) => {
    let height = d.height.imperial;
    let weight = d.weight.imperial;
    height = height.replace(/ /g, "").split("-");
    weight = weight.replace(/ /g, "").split("-");
    d.height = { min: parseFloat(height[0]), max: parseFloat(height[1]) };
    d.weight = { min: parseFloat(weight[0]), max: parseFloat(weight[1]) };
  });
  return dogs;
};

const insideHeightRange = (dogHeight, acceptableRange) => {
  return (
    (dogHeight.min >= acceptableRange[0] &&
      dogHeight.min <= acceptableRange[1]) ||
    (dogHeight.max >= acceptableRange[0] && dogHeight.max <= acceptableRange[1])
  );
};

const insideWeightRange = (dogWeight, acceptableRange) => {
  return (
    (dogWeight.min >= acceptableRange[0] &&
      dogWeight.min <= acceptableRange[1]) ||
    (dogWeight.max >= acceptableRange[0] && dogWeight.max <= acceptableRange[1])
  );
};

function DogForm(props) {
  const { pickDog, favorites, toggleFavorite } = props;
  const [dogs, setDogs] = React.useState(props.dogs);
  const [weight, setWeight] = React.useState(WEIGHT_RANGE);
  const [height, setHeight] = React.useState(HEIGHT_RANGE);
  const [onlyFavorites, setOnlyFavorites] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    getBreedList()
      .then((response) => {
        debugger;
        if (response && response.status === 200) {
          const data = restructureData(response.data);
          ALL_DOGS = data;
          setDogs(data);
          debugger;
        }
      })
      .catch((e) => {
        setError(error);
        throw new Error(e.message);
      });
  }, []);

  // filter dogs list to show only dogs that match filters
  useEffect(() => {
    if (!dogs) return;
    const filteredDogs = ALL_DOGS.filter((d) => {
      return (
        insideWeightRange(d.weight, weight) &&
        insideHeightRange(d.height, height) &&
        (onlyFavorites ? favorites.includes(d.id) : true)
      );
    });
    setDogs(filteredDogs);
  }, [weight, height, onlyFavorites]);

  const clearFilters = () => {
    setWeight(WEIGHT_RANGE);
    setHeight(HEIGHT_RANGE);
    setDogs(ALL_DOGS);
  };

  const handleWeightChange = (event, newValue) => {
    setWeight(newValue);
  };

  const handleHeightChange = (event, newValue) => {
    setHeight(newValue);
  };

  const handleFavoriteCheckbox = (event, newValue) => {
    setOnlyFavorites(newValue);
  };

  const pickDogHandler = (event, newValue) => {
    return pickDog(newValue);
  };

  if (!dogs) return <CircularProgress />;

  return (
    <div className="dog-form">
      <div className="filter-controls">
        <Typography id="weight-slider" gutterBottom>
          Weight: <strong>{weight[0]}</strong> to <strong>{weight[1]}</strong>{" "}
          pounds
        </Typography>
        <PawSlider
          value={weight}
          onChange={handleWeightChange}
          valueLabelDisplay="auto"
          aria-labelledby="weight-slider"
          min={2}
          max={200}
        />

        <Typography id="height-slider" gutterBottom>
          Height: <strong>{height[0]}</strong> to <strong>{height[1]}</strong>{" "}
          inches
        </Typography>
        <PawSlider
          value={height}
          onChange={handleHeightChange}
          valueLabelDisplay="auto"
          aria-labelledby="height-slider"
          min={5}
          max={40}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={onlyFavorites}
              onChange={handleFavoriteCheckbox}
              color="secondary"
            ></Checkbox>
          }
          label="Show only favorites"
        />

        <Button variant="contained" color="primary" onClick={clearFilters}>
          Reset Filters
        </Button>
      </div>
      <div></div>
      <Autocomplete
        id="autocomplete-dog"
        options={dogs}
        getOptionLabel={(option) => option.name}
        renderOption={(option) => (
          <React.Fragment>
            <Icon
              style={{ marginRight: "8px", color: "hotpink" }}
              onClick={(e) => toggleFavorite(e, option.id)}
            >
              {favorites.includes(option.id) ? "favorite" : "favorite_outline"}
            </Icon>
            {option.name}
          </React.Fragment>
        )}
        style={{
          width: "100%",
          margin: "16px 0",
        }}
        renderInput={(params) => (
          <TextField {...params} label="Dog" variant="outlined" />
        )}
        onChange={pickDogHandler}
      />
    </div>
  );
}

export default DogForm;
