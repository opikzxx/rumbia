import PropTypes from "prop-types";

export default function Button({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  type = "button",
  className = "",
}) {
  const baseStyle =
    "flex items-center font-medium rounded-full focus:outline-none focus:ring-4 transition justify-center";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300",
    secondary: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-300",
    outline:
      "bg-transparent border border-white text-white hover:text-black hover:bg-gray-100 focus:ring-gray-200",
  };

  const sizeStyles = {
    small: "px-4 py-2 text-xs",
    medium: "px-6 py-3 text-sm",
    large: "px-8 py-4 text-lg",
  };

  const buttonStyle = `${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button type={type} className={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "outline"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  onClick: PropTypes.func,
  className: PropTypes.string,
};
