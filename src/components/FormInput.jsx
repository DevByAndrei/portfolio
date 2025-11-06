export default function FormInput({
  label,
  id,
  type = "text",
  value,
  onChange,
  error,
  ...props
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm font-semibold mb-2 text-white">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`p-3 rounded-lg bg-bg-dark text-text-main border ${
          error ? "border-red-bright" : "border-gray-600"
        } focus:outline-none focus:border-red-bright focus:ring-2 focus:ring-red-bright/30 transition-colors duration-300`}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-400 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
