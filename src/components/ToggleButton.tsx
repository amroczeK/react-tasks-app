import { useContext } from "react";
import { Task } from "../App";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { TasksDispatchContext } from "../context/TasksContext";

type Props = {
  task: Task;
};

function ToggleButton({ task }: Props) {
  const dispatch = useContext(TasksDispatchContext);

  return (
    <button
      aria-label={`Task completion toggle, task status ${
        task.completed ? "completed" : "incomplete"
      }`}
      className="p-1 rounded-md hover:bg-white text-light hover:text-primary z-50"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // Prevent onClick event from propagating to the li element, otherwise toggleTask() runs twice
        dispatch({ type: "TOGGLE", id: task.id });
      }}
    >
      <CheckCircleIcon className="h-6 w-6" />
    </button>
  );
}

export default ToggleButton;
