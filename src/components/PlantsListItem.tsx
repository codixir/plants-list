import React, { FunctionComponent } from "react";
import { IPlant } from "../models/plant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faTree,
  faSkullCrossbones
} from "@fortawesome/free-solid-svg-icons";
import "./PlantsListItem.css";
import "./PlantsListItem.css";

interface IProps {
  handleClick: (arg: IPlant) => void;
  plant: IPlant[];
  index: number;
}

const PlantsListItem: FunctionComponent<IProps> = (props) => {
  const { plant, handleClick } = props;
  return (
    <tr>
      <td>{plant.genus}</td>
      <td>{plant.species}</td>
      <td>
        {plant.deceased ? (
          <FontAwesomeIcon icon={faSkullCrossbones} />
        ) : (
          <FontAwesomeIcon icon={faTree} />
        )}
      </td>
      <td>
        <button
          type="button"
          className="btn btn-link"
          onClick={(e: HTMLButtonElement) => handleClick(e, plant)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </td>
    </tr>
  );
};

export default PlantsListItem;
