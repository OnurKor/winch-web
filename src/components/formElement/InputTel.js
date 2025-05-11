import React, { useState } from "react";
import { useField } from "formik";
import classNames from "classnames";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import redAlert from "../../assets/icons/red-alert.svg";

const InputTel = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (value, data, event, formattedValue) => {
    helpers.setValue(value); // Formik'in değer ayarlama özelliği
  };

  return (
    <div className="w-full relative">
      <label className="relative w-full flex flex-col items-start">
        {/* Etiket */}
        <div
          className={classNames(
            "absolute left-3 transition-all text-secondary font-regular",
            {
              "mt-0 text-body-small": isFocused || field.value,
              "top-1/2 transform -translate-y-1/2": !isFocused && !field.value,
            }
          )}
        >
          {label}
        </div>

        {/* Phone Input */}
        <PhoneInput
          {...field}
          {...props}
          country={"tr"} // Varsayılan ülke
          value={field.value}
          onChange={handleChange}
          inputClass="flex-1 w-full !h-full border-[1px] rounded-[4px] py-3 px-3 border-secondary hover:border-lightkozy focus:outline-none focus:border-lightkozy transition-all duration-200"
          buttonClass="rounded-l-[4px] border-r-[1px] border-secondary hover:border-lightkozy"
          containerClass="flex w-full h-12 border-[1px] border-secondary rounded-[4px] hover:border-lightkozy focus-within:border-lightkozy transition-all duration-200"
          dropdownClass="absolute z-50 w-[250px] bg-white shadow-md"
          searchClass="border rounded px-2 py-1 mb-2 w-full"
          enableSearch
          disableSearchIcon={false}
        />

        {/* Hata Mesajı */}
        {meta.error && meta.touched && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <img src={redAlert} alt="Error Alert" width={20} height={20} />
          </div>
        )}
      </label>

      {/* Hata Metni */}
      {meta.error && meta.touched && (
        <p className="text-red-500 text-sm mt-1">{meta.error}</p>
      )}
    </div>
  );
};

export default InputTel;
