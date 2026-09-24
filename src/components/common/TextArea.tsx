import React, { TextareaHTMLAttributes, useState } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number;
  isValid?: boolean;
  errorMessage?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  rows = 2,
  isValid,
  errorMessage,
  className = "",
  ...props
}) => {
  const [touched, setTouched] = useState(false);

  const handleBlur = () => setTouched(true);

  const getBorderClasses = () => {
    if (!touched)
      return "border-gray-300 focus:ring-rose-300 focus:border-rose-300";
    if (isValid === true)
      return "border-green-500 focus:ring-green-500 focus:border-green-500";
    if (isValid === false)
      return "border-red-500 focus:ring-red-500 focus:border-red-500";
    return "border-gray-300 focus:ring-rose-300 focus:border-rose-300";
  };

  return (
    <div className="flex flex-col space-y-1">
      <textarea
        {...props}
        rows={rows}
        onBlur={handleBlur}
        onChange={(e) => {
          props.onChange && props.onChange(e);
          if (!touched) setTouched(true);
        }}
        className={`w-full border rounded-3xl py-2 px-3 text-sm resize-none ${getBorderClasses()} focus:outline-hidden focus:ring-1 ${className}`}
      />

      {touched && isValid === false && errorMessage && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default Textarea;
