import React, { useState } from "react";

interface props {
  number: any;
}

const DisplayScreen: React.FC<props> = ({ number }) => {
  return (
    <input
      value={number}
      readOnly
      className="cursor-not-allowed focus:outline-none w-full h-1/5 bg-sky-300 text-right border-2 border-white rounded-lg flex items-center justify-end p-5 text-white font-semibold text-2xl"
    />
  );
};

export default DisplayScreen;
