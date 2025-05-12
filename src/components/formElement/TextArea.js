import classNames from "classnames";
import { ErrorMessage, useField } from "formik";
import React, { useEffect, useState } from "react";
import redAlert from "../../assets/icons/red-alert.svg";

export default function TextArea({ label, ...props }) {
  const [field, meta, helpers] = useField(props);
  const [isFocused, setIsFocused] = useState(false);

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
    <div className="block w-full relative">
      <div
        className={classNames({
          "absolute h-4 transition-all duration-300 text-label-large text-secondary font-regular w-2": true,
          "mt-[4px] left-2 text-body-small text-default font-regular":
            isFocused || field.value,
          "top-6 transform -translate-y-1/2 left-2": !isFocused && !field.value,
        })}
      >
        {label}
      </div>
      <textarea
        className={classNames({
          "w-full resize-none outline-none rounded-[8px] pt-6 indent-2 text-label-large font-regular text-default border border-secondary hover:border-lightkozy focus:border-lightkozy": true,
          "focus:border-darkkozy": !meta.error || meta.touched,
          "border-[1px] border-paradise": meta.error && meta.touched,
        })}
        {...field}
        {...props}
        onFocus={handleFocus} // Odaklandığında (focus) değeri true yap
        onBlur={handleBlur} // Odaktan çıkıldığında (blur) değeri false yap
      />
      {meta.error && meta.touched && (
        <img
          src={redAlert}
          alt="Error Alert"
          className="absolute right-3 top-6 transform -translate-y-1/2 w-5 h-5"
        />
      )}
    </div>
  );
}
