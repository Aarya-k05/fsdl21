import { useState } from "react";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setTask("");
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">To-Do List</h2>
      <div className="flex space-x-2">
        <input
          type="text"
          className="border p-2 flex-grow rounded"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={addTask}
        >
          Add
        </button>
      </div>
      <ul>
        {tasks.map((t, index) => (
          <li key={index} className="flex justify-between p-2 border-b">
            {t}
            <button
              className="text-red-500"
              onClick={() => removeTask(index)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
