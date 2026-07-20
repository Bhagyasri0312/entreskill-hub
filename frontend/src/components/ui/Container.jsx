const sizeClassNames = {
  sm: 'ds-container--sm',
  md: 'ds-container--md',
  lg: 'ds-container--lg',
  xl: 'ds-container--xl'
};

export default function Container({ as: Component = 'div', size = 'lg', className = '', ...props }) {
  const classes = ['ds-container', sizeClassNames[size] ?? sizeClassNames.lg, className]
    .filter(Boolean)
    .join(' ');

  return <Component className={classes} {...props} />;
}