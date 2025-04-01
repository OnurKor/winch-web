import React from "react";

const AppHeader = ({ header, subHeader, buttonName, func, buttonColor }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="">
        <div className="text-md font-bold text-default">{header}</div>
        <div className="text-sm text-lightkozy">{subHeader}</div>
      </div>
      {buttonName && (
        <button
          onClick={func}
          className={`${
            buttonColor ? `bg-red-500` : "bg-lightkozy"
          } p-2 text-white rounded-lg text-[12px] `}
        >
          {buttonName}
        </button>
      )}
    </div>
  );
};

export default AppHeader;
