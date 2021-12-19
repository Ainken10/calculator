import React from "react";

interface props {
  className: string;
  value: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<props> = ({ className, value, onClick }) => {
  return (
    <button value={value} className={className+" shadow-lg "} onClick={(e) => onClick(e)}>
      {value}
    </button>
  );
};

export default Button;
