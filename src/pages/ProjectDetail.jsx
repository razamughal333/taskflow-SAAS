import { useParams } from "react-router-dom";
import { useState, useRef } from "react";
import { projects } from "../data/projects";

function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id));

  const [tasks, setTasks] = useState(project ? project.tasks : []);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const inputRef = useRef(null);

  if (!project) {
    return <h1>Project not found</h1>;
  }

  const handleAddTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: tasks.length + 1,
      title: newTaskTitle,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    inputRef.current.focus(); // auto-focus back on the input after adding
  };

  return (
    <div>
      <h1>{project.name}</h1>
      <p>{project.description}</p>

      <h2>Tasks</h2>
      {tasks.map((task) => (
        <p key={task.id}>
          {task.title} — {task.completed ? "Done" : "Not done"}
        </p>
      ))}

      <form onSubmit={handleAddTask}>
        <input
          ref={inputRef}
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New task title"
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default ProjectDetail;
