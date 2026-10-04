function Welcome({ name, project, className = "" }) {
  return (
    <section className={`card welcome-card ${className}`.trim()}>
      <h2>Welcome, {name}!</h2>

      <p>
        You are working on: {project}
      </p>
    </section>
  );
}

export default Welcome;