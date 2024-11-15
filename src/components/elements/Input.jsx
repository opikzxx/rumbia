import PropTypes from "prop-types";

export default function Input({
  label,
  type = "text",
  name,
  register,
  validation = {},
  error,
  placeholder = "",
  className = "",
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={name} className="font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        {...register(name, validation)}
        placeholder={placeholder}
        className={`border border-slate-200 rounded-lg p-2 ${className}`}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  validation: PropTypes.object,
  error: PropTypes.object,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};
