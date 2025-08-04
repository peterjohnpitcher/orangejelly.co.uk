interface TextProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  color?: 'default' | 'muted' | 'white' | 'orange' | 'teal' | 'red' | 'green';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right' | 'justify';
  className?: string;
}

export default function Text({
  children,
  size = 'base',
  color = 'default',
  weight = 'normal',
  align = 'left',
  className = ''
}: TextProps) {
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl'
  };

  const colors = {
    default: 'text-charcoal',
    muted: 'text-charcoal/80',
    white: 'text-white',
    orange: 'text-orange',
    teal: 'text-teal',
    red: 'text-red-600',
    green: 'text-green-600'
  };

  const weights = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  };

  return (
    <p className={`${sizes[size]} ${colors[color]} ${weights[weight]} ${alignments[align]} ${className}`}>
      {children}
    </p>
  );
}