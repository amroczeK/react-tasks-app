import { Task } from "../App";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  task: Task;
  dispatchHandler: (id: number) => void;
};

function ToggleButton({ task, dispatchHandler }: Props) {
  return (
    <button
      className="p-1 rounded-md hover:bg-white text-light hover:text-primary z-50"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // Prevent onClick event from propagating to the li element, otherwise toggleTask() runs twice
        dispatchHandler(task.id);
      }}
    >
      <CheckCircleIcon className="h-6 w-6" />
    </button>
  );
}

export default ToggleButton;
