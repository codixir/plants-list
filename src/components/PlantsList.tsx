import React, { FunctionComponent } from "react";
import PlantsListItem from "./PlantsListItem";
import { IPlant } from "../models/plant";
import "./PlantsList.css";
import "./PlantsList.css";

interface IProps {
  handleClick: (arg: IPlant) => void;
  unfilteredPlants: IPlant[];
}

const PlantsList: FunctionComponent<IProps> = (props) => {
  const { unfilteredPlants, handleClick } = props;
  return (
    <div className="plants-list table-body">
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Genus</th>
            <th>Species</th>
            <th>Status</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {unfilteredPlants.map((plant: IPlant, index: number) => {
            return (
              <PlantsListItem
                key={index}
                plant={plant}
                handleClick={handleClick}
                index={index}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PlantsList;
