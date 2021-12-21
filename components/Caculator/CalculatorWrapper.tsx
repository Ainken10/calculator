import React from "react";

const CalculatorWrapper: React.FC = ({ children }) => {
  return (
    <div className="w-96 h-[450px] bg-sky-400 shadow-lg rounded-lg p-2 flex flex-col">
      {children}
    </div>
  );
};

export default CalculatorWrapper;
