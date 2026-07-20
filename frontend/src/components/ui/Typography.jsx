const variantTagMap = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  body: 'p',
  label: 'span',
  caption: 'span'
};

export default function Typography({ as, variant = 'body', className = '', ...props }) {
  const Component = as ?? variantTagMap[variant] ?? 'p';
  const classes = ['ds-type', `ds-type--${variant}`, className].filter(Boolean).join(' ');

  return <Component className={classes} {...props} />;
}