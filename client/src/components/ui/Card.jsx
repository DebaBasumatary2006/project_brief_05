function Card({ title, description, children, className = "" }) {
  return (
    <article className={`card ${className}`.trim()}>
      {title && <h3>{title}</h3>}
      {description && <p>{description}</p>}
      {children && <div className="card-content">{children}</div>}
    </article>
  );
}

export default Card;