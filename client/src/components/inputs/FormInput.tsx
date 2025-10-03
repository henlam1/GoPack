import React from 'react';

type InputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = 'text', placeholder, error, ...props }, ref) => {
    return (
      <label className="form-control floating-label w-full">
        <span className="label-text">{label}</span>
        <input
          type={type}
          placeholder={placeholder}
          className="input input-bordered w-full"
          ref={ref} // <- forward the ref here
          {...props}
        />
        {error && <p className="text-error text-sm mt-1">{error}</p>}
      </label>
    );
  },
);

FormInput.displayName = 'FormInput'; // Required for React DevTools

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextAreaInput = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaProps
>(({ label, placeholder, error, ...props }, ref) => {
  return (
    <label className="form-control floating-label w-full">
      <span className="label-text">{label}</span>
      <textarea
        ref={ref}
        placeholder={placeholder}
        className={`textarea textarea-bordered w-full`}
        {...props}
      />
      {error && <p className="text-error text-sm mt-1">{error}</p>}
    </label>
  );
});
