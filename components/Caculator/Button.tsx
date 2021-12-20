import React from "react";

interface props {
  className: string;
  value: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<props> = ({ className, value, onClick }) => {
  return (
    <button value={value} className={`${className} mx-2 font-semibold h-12  transition text-white rounded-lg border-white border-2 shadow-lg `} onClick={(e) => onClick(e)}>
      {value}
    </button>
  );
};

export default Button;
