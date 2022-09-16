import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 40 40" {...props}>
      <path
        d="M40 20C40 33.8071 33.8071 40 20 40C6.19288 40 0 33.8071 0 20C0 6.19288 6.19288 0 20 0C33.8071 0 40 6.19288 40 20Z"
        fill="#00B812"
      ></path>
      <path d="M21.807 8.48071H16.2431L15.267 11.4323H18.3573V17.6495H21.807V8.48071Z" fill="white"></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M26.3455 25.1739C26.3455 28.6784 23.5046 31.5193 20.0001 31.5193C16.4957 31.5193 13.6548 28.6784 13.6548 25.1739C13.6548 21.6695 16.4957 18.8285 20.0001 18.8285C23.5046 18.8285 26.3455 21.6695 26.3455 25.1739ZM23.4648 25.1739C23.4648 27.0874 21.9136 28.6386 20.0001 28.6386C18.0866 28.6386 16.5355 27.0874 16.5355 25.1739C16.5355 23.2604 18.0866 21.7092 20.0001 21.7092C21.9136 21.7092 23.4648 23.2604 23.4648 25.1739Z"
        fill="white"
      ></path>
    </Svg>
  );
};

export default Icon;
