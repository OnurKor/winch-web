import { useField } from "formik";
import React from "react";
import check from "../../assets/icons/ancor.svg";
import { motion } from "framer-motion";

export default function ButtonBox({
  value,
  label,
  sub_label,
  boolean = false,
  onChange,
  delay,
  disabled,
  small = false,
  setTabs = () => {},
  ...props
}) {
  const [field, , helpers] = useField(props);
  const { setValue } = helpers;

  const handleClick = () => {
    if (disabled) return;
    const newValue = boolean ? !field.value : value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Başlangıç konumu
      animate={{ opacity: 1, y: 0 }} // Animasyonlu son konumu
      exit={{ opacity: 0, y: -20 }} // Çıkış animasyonu
      transition={{ duration: 0.5, delay }} // Gecikmeli animasyon süresi
      onClick={handleClick}
      className={`${
        small ? "xl:w-[107px] h-[48px]" : " min-w-[180px] xl:w-[117px] h-[88px]"
      } p-2 flex justify-center items-center rounded-[8px] border-[1px] cursor-pointer relative bg-lightkozy shadow-custom`}
    >
      <div
        className={` ${
          small ? "absolute -top-0 right-6" : "absolute top-1 right-8"
        }  `}
      >
        {boolean ? (
          field.value === true ? (
            <div
              className={`${
                small ? "w-[15px] h-[15px]" : "w-[25px] h-[25px]"
              } bg-default rounded-full flex justify-center items-center absolute top-1 left-1`}
            >
              <img src={check} width={15} height={15} alt="check" />
            </div>
          ) : (
            ""
          )
        ) : field.value === value ? (
          <div
            className={`${
              small ? "w-[15px] h-[15px]" : "w-[25px] h-[25px]"
            } bg-default rounded-full flex justify-center items-center absolute top-1 left-1`}
          >
            <img src={check} width={15} height={15} alt="check" />
          </div>
        ) : null}
      </div>

      <div className="flex flex-col justify-center items-center w-full">
        <div
          className={`${
            small ? "text-xs" : "text-xl"
          } text-white font-medium text-title-medium w-full`}
        >
          {label}
        </div>
        <div
          className={`${
            small ? "text-xs" : "text-xl"
          } text-darkkozy font-medium text-title-medium w-full text-center`}
        >
          {sub_label}
        </div>
      </div>
    </motion.div>
  );
}
