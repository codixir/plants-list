import React, { useState, useEffect, Suspense } from "react";
import PlantsList from "./components/PlantsList";
import Select from "./components/Select";
import Card from "./components/Card";
import { data } from "./data";
import { IPlant } from "./models/plant";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";

export const App = () => {
  const [unfilteredPlants, setUnfilteredPlants] = useState<IPlant[]>([]);
  const [plants, setPlants] = useState<IPlant[]>([]);
  const [family, setFamily] = useState<string[]>([]);
  const [genus, setGenus] = useState<string[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [selectedFamily, setSelectedFamily] = useState("");
  const [selectedGenus, setSelectedGenus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const filterPlants = (
    array: IPlant[],
    selectedType: string,
    type: string
  ) => {
    const filteredPlants = array.filter((item: IPlant) => {
      if (selectedType.toLocaleLowerCase() === "all") {
        return item;
      }
      return selectedType.toLowerCase() === item[type].toLowerCase();
    });

    setUnfilteredPlants(filteredPlants);
  };

  const handleClick = (e: HTMLButtonElement, data: IPlant) => {
    const updatedPlants = plants.map((item: IPlant) => {
      if (data.id === item.id) {
        item.deceased = true;
      }

      return item;
    });

    setPlants([...updatedPlants]);
  };

  const handleFamilySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUnfilteredPlants(plants);
    setSelectedFamily(e.target.value || "");
  };

  const handleGenusSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUnfilteredPlants(plants);
    setSelectedGenus(e.target.value || "");
  };

  const transormIntoOptions = (plants: IPlant[]) => {
    const transformedOptions: IPlant[] = [];
    const familyNames: string[] = ["All"];
    const genusNames: string[] = ["All"];

    plants.forEach((item: IPlant) => {
      item.id = uuidv4();
      transformedOptions.push(item);

      if (!familyNames.includes(item.family)) {
        familyNames.push(item.family);
      }

      if (!genusNames.includes(item.genus)) {
        genusNames.push(item.genus);
      }

      setGenus([...genusNames]);
      setFamily([...familyNames]);
    });

    return transformedOptions;
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setErrorMessage("");
      try {
        const res: any = await data;
        const transformedOptions: IPlant[] = transormIntoOptions(res.plants);
        setPlants(transformedOptions);
        setUnfilteredPlants(transformedOptions);
        setLoading(false);
      } catch (e) {
        const msg = "Unable to load the data";

        setErrorMessage(msg);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    filterPlants(unfilteredPlants, selectedFamily, "family");
  }, [selectedFamily]);

  useEffect(() => {
    filterPlants(unfilteredPlants, selectedGenus, "genus");
  }, [selectedGenus]);

  return (
    <div className="container">
      <h1 className="title">The Plant List</h1>
      <div className="row">
        <div className="col-md-5 selection-container">
          <Card classNames="card-styles">
            <div className="selects">
              <Select
                label="Filter by family"
                name="family"
                value={selectedFamily}
                options={family}
                handleSelect={handleFamilySelect}
              />
              <Select
                label="Filter by genus"
                name="genus"
                value={selectedGenus}
                options={genus}
                handleSelect={handleGenusSelect}
              />
            </div>
          </Card>
        </div>
        <div className="col-md-7">
          <div className="plants-list-container">
            {isLoading ? (
              <p style={{ textAlign: "center" }}>Loading...</p>
            ) : (
              <div>
                {errorMessage.length ? (
                  <p style={{ textAlign: "center", color: "#ea4646" }}>
                    {errorMessage}
                  </p>
                ) : (
                  <PlantsList
                    unfilteredPlants={unfilteredPlants}
                    handleClick={handleClick}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
