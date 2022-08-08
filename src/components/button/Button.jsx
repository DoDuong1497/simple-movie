import React from "react";

const Button = ({
  onClick,
  full = false,
  className,
  type = "button",
  bgColor = "primary",
  children,
  ...props
}) => {
  let bgClassName = "bg-primary";

  switch (bgColor) {
    case "primary":
      bgClassName = "bg-primary";
      break;

    case "secondary":
      bgClassName = "bg-secondary";
      break;

    default:
      break;
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-3 px-5 font-bold rounded-lg capitalize mt-auto ${
        full ? "w-full" : ""
      } ${bgClassName} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
