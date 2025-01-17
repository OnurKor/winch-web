import React from "react";

export default function Avatar({ username }) {
  return (
    <>
      {username != undefined && (
        <div className="w-[35px] h-[35px] rounded-full border flex justify-center items-center overflow-hidden bg-lightkozy text-whitekozy text-label-small font-regular text-center">
          {username
            .split(" ")
            .map((word) => word.toUpperCase().charAt(0))
            .join("")}
        </div>
      )}
    </>
  );
}
