'use client';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  variant?: 'default' | 'filled' | 'outlined';
}

export default function Input({
  label,
  error,
  helperText,
  fullWidth = false,
  variant = 'default',
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || props.name;

  const variantClasses = {
    default: 'bg-white border-charcoal/20 focus:border-orange',
    filled: 'bg-charcoal/5 border-transparent focus:bg-white focus:border-orange',
    outlined: 'bg-transparent border-charcoal/30 focus:border-orange',
  };

  const inputClasses = `
    px-4 py-3 rounded-lg border-2 transition-all
    ${variantClasses[variant]}
    focus:outline-none focus:ring-2 focus:ring-orange/20
    disabled:opacity-50 disabled:cursor-not-allowed
    ${error ? 'border-red-500 focus:border-red-500' : ''}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-charcoal mb-2"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={inputClasses}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-2 text-sm text-charcoal/60">{helperText}</p>
      )}
    </div>
  );
}