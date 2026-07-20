export default function Card({ className = '', padding = 'md', elevated = false, ...props }) {
  const classes = ['ds-card', `ds-card--padding-${padding}`, elevated ? 'ds-card--elevated' : '', className]
    .filter(Boolean)
    .join(' ');

  return <article className={classes} {...props} />;
}