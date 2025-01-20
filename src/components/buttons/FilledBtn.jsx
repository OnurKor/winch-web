
import React from "react";

export default function FilledBtn({ title, func , image,disabled}) {
  return (
    <button
      onClick={func}
      className={`${disabled ? "bg-greykozy text-secondary border-kozydarkgrey" : " bg-lightkozy p-2 text-white rounded-lg text-[12px]  "} rounded-[4px] px-6 py-2 ease-in-out duration-300 h-12 border-[1px] flex justify-center items-center gap-3 w-full md:w-fit`}
    >
      <div>{title}</div>
    </button>
  );
}
