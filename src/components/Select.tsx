import React, { FunctionComponent } from "react";
import "./Select.css";

interface IProps {
  label: string;
  name: string;
  value: string;
  options: string[];
  handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: FunctionComponent<IProps> = (props) => {
  const { label, name, value, options, handleSelect } = props;
  return (
    <div className="select-box">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        value={value}
        className="custom-select"
        options={options}
        onChange={handleSelect}
      >
        {options.map((item: string, index: number) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
