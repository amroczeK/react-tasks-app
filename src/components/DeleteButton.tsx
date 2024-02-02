import { Task } from "../App";
import { TrashIcon } from "@heroicons/react/24/outline";

type Props = {
  task: Task;
  dispatchHandler: (id: number) => void;
};

function DeleteButton({ task, dispatchHandler }: Props) {
  return (
    <button
      className="p-1 rounded-md hover:bg-white text-light hover:text-primary z-10"
      onClick={() => dispatchHandler(task.id)}
    >
      <TrashIcon className="h-6 w-6" />
    </button>
  );
}

export default DeleteButton;
