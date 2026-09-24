import React, { forwardRef, InputHTMLAttributes, useState, Ref } from "react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ComponentType<{ className?: string }>;
  iconPosition?: "left" | "right";
  isValid?: boolean;
  errorMessage?: string;
  type?: string;
}

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  (
    {
      icon,
      iconPosition = "left",
      isValid,
      errorMessage,
      className = "",
      type = "text",
      ...props
    },
    ref: Ref<HTMLInputElement> // ✅ Properly typed
  ) => {
    const [touched, setTouched] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword && !showPassword ? "password" : "text";

    const IconComponent = icon;

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
        <div className="relative">
          {IconComponent && iconPosition === "left" && (
            <IconComponent className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          )}

          <input
            {...props}
            ref={ref}
            type={inputType}
            onBlur={handleBlur}
            onChange={(e) => {
              props.onChange?.(e);
              if (!touched) setTouched(true);
            }}
            className={`w-full border rounded-3xl py-2 px-3 text-sm ${
              icon && iconPosition === "left" ? "pl-10" : ""
            } ${
              (icon && iconPosition === "right") || isPassword ? "pr-10" : ""
            } ${getBorderClasses()} focus:outline-hidden focus:ring-1 ${className}`}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          )}

          {!isPassword && IconComponent && iconPosition === "right" && (
            <IconComponent className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          )}

          {touched && isValid === true && !isPassword && (
            <CheckCircleIcon className="h-5 w-5 text-green-500 absolute right-3 top-1/2 transform -translate-y-1/2" />
          )}
          {touched && isValid === false && !isPassword && (
            <ExclamationCircleIcon className="h-5 w-5 text-red-500 absolute right-3 top-1/2 transform -translate-y-1/2" />
          )}
        </div>

        {touched && isValid === false && errorMessage && (
          <p className="text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    );
  }
);

InputText.displayName = "InputText";

export default InputText;
