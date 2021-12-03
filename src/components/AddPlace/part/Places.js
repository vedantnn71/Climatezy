import { Link } from "react-router-dom";
import { useState } from "react";
import "boxicons";

const Places = (props) => {
  const handleClick = () => {
    props.setHide(true);
  };

  const deletePlace = (place) => {
    const filterCities = props.cities.filter((city) => city !== place);
    props.setCities(filterCities);
  };

  return props.place !== "" ? (
    props.place === "Add" ? (
      ""
    ) : (
      <li className="box completion-box-item">
        <Link
          className="completion-item"
          to={`/places/${props.place}`}
          onClick={handleClick}
          id={props.place}
        >
          {props.place}
        </Link>
        {props.place === "Current" ? (
          ""
        ) : (
          <button
            className="no-border btn btn-close"
            onClick={() => deletePlace(props.place)}
          >
            <box-icon name="x" size="1.6rem"></box-icon>
          </button>
        )}
      </li>
    )
  ) : (
    ""
  );
};

export default Places;
