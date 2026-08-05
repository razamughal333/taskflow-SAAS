import { Link } from "react-router-dom";
import { projects } from "../data/projects";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      {projects.map((project) => (
        <div key={project.id}>
          <Link to={`/project/${project.id}`}>
            <h2>{project.name}</h2>
          </Link>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
