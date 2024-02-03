import { useContext } from "react";
import { Task } from "../App";
import { TrashIcon } from "@heroicons/react/24/outline";
import { TasksDispatchContext } from "../context/TasksContext";

type Props = {
  task: Task;
};

function DeleteButton({ task }: Props) {
  const dispatch = useContext(TasksDispatchContext);
  
  return (
    <button
      className="p-1 rounded-md hover:bg-white text-light hover:text-primary z-10"
      onClick={() => dispatch({ type: "DELETE", id: task.id })}
    >
      <TrashIcon className="h-6 w-6" />
    </button>
  );
}

export default DeleteButton;
