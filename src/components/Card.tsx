import React, {
  useState,
  FunctionComponent,
  ReactChildren,
  ReactChild,
  useEffect
} from "react";
import "./Card.css";

interface IProps {
  classNames?: string;
  children: ReactChild | ReactChildren;
}

const Card: FunctionComponent<IProps> = (props) => {
  const [classes, setClasses] = useState("");
  const { children, classNames } = props;

  useEffect(() => {
    setClasses(`card ${classNames}`);
  }, [classNames]);

  return <div className={classes}>{children}</div>;
};

export default Card;
