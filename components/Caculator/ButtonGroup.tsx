import React, { Children } from "react";

const ButtonGroup: React.FC = ({ children }) => {
  return (
    <div className="w-full h-full my-2  flex justify-center flex-wrap">
      {children}
    </div>
  );
};

export default ButtonGroup;
