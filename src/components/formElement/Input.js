import React, { useEffect, useState } from "react";
import { ErrorMessage, useField } from "formik";
import classNames from "classnames";
import redAlert  from   "../../assets/icons/red-alert.svg"

export default function Input({ label, ...props }) {
  const [field, meta, helpers] = useField(props);
  const [isFocused, setIsFocused] = useState(false);
 

  const [skipAnimation, setSkipAnimation] = useState(false); // Animasyonu atlama durumu

  useEffect(() => {
    // Eğer başlangıçta bir value varsa animasyon olmadan direkt label yukarı çıkar
    if (field.value) {
      setSkipAnimation(true);
    }
  }, [field.value]);

  // Focus ve Blur olaylarını izleme
  const handleFocus = () => {
    setIsFocused(true);
    setSkipAnimation(false); // Artık animasyonu başlatabiliriz
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    field.onBlur(e);
  };




  return (
    <>
      <label className="w-full relative  justify-center items-center cursor-pointer">
      <div
  className={classNames(
    "absolute w-full  text-secondary font-regular transition-all duration-200 ease-in-out  pl-3",
    {
      "mt-[2px]  text-body-small ": isFocused || field.value, 
      "mt-3.5  text-label-large ": !isFocused || !field.value, 
      "transition-none": skipAnimation, 
      
    }
  )}
>
  {label}
</div>

        <input
          {...field} 
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={classNames({
            "w-full h-12 border-[1px] rounded-[4px] pt-3 px-3 leading-10 border-secondary hover:border-lightkozy focus:border-lightkozy focus:outline-none shadow-custom": true,
            "focus:border-black": !meta.error || meta.touched,
            "border-paradise": meta.error && meta.touched,
          })}
        />
        {meta.error && meta.touched && (
          <img
            src={redAlert}
            alt="Error Alert"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 "
            width={20}
            height={20}
          />
        )}
      </label>
    </>
  );
}
