export default function OutlinedBaseBtn({
  title,
  func,
  image,
  disabled,
  extensive,
  type = "button",
})
 {
  return (
    <button
      onClick={func}
      type={type}
      className={`${
        disabled
          ? "bg-greykozy text-secondary border-kozydarkgrey"
          : " bg-whitekozy  border-lightkozy rounded-[4px] hover:border-secondary  hover:bg-lightkozy hover:text-whitekozy  "
      } rounded-[4px] px-6 py-2 transition-all duration[250ms] h-12 border-[1px] flex justify-center items-center gap-3 ${
        extensive && "w-[300px]"
      }`}
    >
      <div>{title}</div>
      {image && <image src={image} width={15} height={15} alt="arrow" />}
    </button>
  );
}
