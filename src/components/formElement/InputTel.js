import React, { useEffect, useState } from "react";
import { useMask } from '@react-input/mask';
import { useField } from "formik";
import classNames from "classnames";
import redAlert  from   "../../assets/icons/red-alert.svg"

const InputTel = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useMask({ mask: '+__ (___) ___-__-__', replacement: { _: /\d/ } });

    // Focus ve Blur olaylarını izleme
    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e) => {
      setIsFocused(false);
      field.onBlur(e);
    };
  
    // Değeri izlemek için useEffect kullanma
    useEffect(() => {
      if (field.value) {
        setIsFocused(true);
      } else if (!field.value && !meta.touched) {
        setIsFocused(false);
      }
    }, [field.value, meta.touched]);

  return (
    <>
      <label className="w-full relative  justify-center items-center ">
        <div
          className={classNames(
            "absolute w-full transition-all duration-300 text-label-large text-secondary font-regular",
            {
              "mt-[1px] left-3 text-body-small": isFocused || field.value,
              "top-1/2 transform -translate-y-1/2 left-2":
                !isFocused && !field.value,
            }
          )}
        >
          {label}
        </div>

        <input
        {...field}
        {...props}
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={classNames({
          "w-full h-12 border-[1px] rounded-[4px] py-3 px-3 leading-10 border-secondary hover:border-lightkozy  focus:border-lightkozy focus:outline-none transition-all duration-[250ms]": true,
          "focus:border-black": !meta.error || meta.touched,
          "border-red-500": meta.error && meta.touched,
        })}
      />
        {meta.error && meta.touched && (
          <img
            src={redAlert}
            alt="Error Alert"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            width={20}
            height={20}
          />
        )}
      </label>
    </>
   
  );
};

export default InputTel;
