import { projects } from "../data/projects";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      {projects.map((project) => (
        <div key={project.id}>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
