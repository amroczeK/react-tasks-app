import { useContext } from "react";
import { TasksContext } from "../context/TasksContext";
import TaskItem from "./TaskItem";
import { TaskState } from "../App";

function TaskList() {
  const { tasks } = useContext<TaskState>(TasksContext);

  return (
    <ul
      aria-label="Today's tasks"
      tabIndex={0}
      id="todos-container"
      className="flex flex-col gap-2 overflow-auto"
    >
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default TaskList;
