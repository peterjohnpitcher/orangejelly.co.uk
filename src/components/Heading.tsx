import { memo } from 'react';

interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  align?: 'left' | 'center' | 'right';
  color?: 'default' | 'white' | 'orange' | 'teal';
  className?: string;
  id?: string;
}

function Heading({
  children,
  level = 2,
  align = 'left',
  color = 'default',
  className = '',
  id
}: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const sizes = {
    1: 'text-3xl md:text-4xl lg:text-5xl font-bold',
    2: 'text-2xl md:text-3xl lg:text-4xl font-bold',
    3: 'text-xl md:text-2xl font-bold',
    4: 'text-lg md:text-xl font-semibold',
    5: 'text-base md:text-lg font-semibold',
    6: 'text-sm md:text-base font-semibold'
  };

  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const colors = {
    default: 'text-charcoal',
    white: 'text-white',
    orange: 'text-orange',
    teal: 'text-teal'
  };

  return (
    <Tag 
      className={`${sizes[level]} ${alignments[align]} ${colors[color]} ${className}`}
      id={id}
    >
      {children}
    </Tag>
  );
}

export default memo(Heading);