import { useId } from 'react';

export default function InputField({
  label,
  helperText,
  error,
  className = '',
  id,
  ...props
}) {
  const generatedId = useId().replace(/:/g, '');
  const inputId = id ?? label?.toLowerCase().replace(/[^a-z0-9]+/g, '-') ?? `input-${generatedId}`;
  const describedBy = [helperText ? `${inputId}-help` : null, error ? `${inputId}-error` : null]
    .filter(Boolean)
    .join(' ') || undefined;

  return (
    <label className={['ds-input', className].filter(Boolean).join(' ')} htmlFor={inputId}>
      {label ? <span className="ds-input__label">{label}</span> : null}
      <input
        id={inputId}
        className={`ds-input__control ${error ? 'ds-input__control--error' : ''}`.trim()}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        {...props}
      />
      {helperText ? (
        <span className="ds-input__helper" id={`${inputId}-help`}>
          {helperText}
        </span>
      ) : null}
      {error ? (
        <span className="ds-input__error" id={`${inputId}-error`}>
          {error}
        </span>
      ) : null}
    </label>
  );
}