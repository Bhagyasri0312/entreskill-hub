const variantClassNames = {
  primary: 'ds-button--primary',
  secondary: 'ds-button--secondary',
  accent: 'ds-button--accent',
  ghost: 'ds-button--ghost'
};

const sizeClassNames = {
  sm: 'ds-button--sm',
  md: 'ds-button--md',
  lg: 'ds-button--lg'
};

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  ...props
}) {
  const classes = [
    'ds-button',
    variantClassNames[variant] ?? variantClassNames.primary,
    sizeClassNames[size] ?? sizeClassNames.md,
    className
  ]
    .filter(Boolean)
    .join(' ');

  return <Component className={classes} type={Component === 'button' ? type : undefined} {...props} />;
}