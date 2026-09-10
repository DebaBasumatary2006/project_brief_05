function Welcome({ Alexander, project }) {
  return (
    <div className="card">
      <h2>Welcome, {Alexander}!</h2>

      <p>
        You are working on: {project}
      </p>
    </div>
  );
}

export default Welcome;