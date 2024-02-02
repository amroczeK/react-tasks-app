import { PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

type Props = {
  dispatchCreate: (text: string) => void;
};

function CreateTask({ dispatchCreate }: Props) {
  const [taskText, setTaskText] = useState<string>("");

  const onTaskInput = (text: string) => setTaskText(text);
  return (
    <div className="flex items-center bg-primary border border-secondary rounded-md p-1.5 gap-1">
      <input
        type="text"
        className="w-full bg-primary text-light placeholder-secondar pl-1.5"
        placeholder="Add a task"
        value={taskText}
        onChange={(e) => onTaskInput(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            dispatchCreate(e.currentTarget.value);
            setTaskText("");
          }
        }}
      />
      <button
        aria-label="Add the task to list"
        className="p-1 rounded-md hover:bg-secondary self-center"
        onClick={() => {
          dispatchCreate(taskText);
          setTaskText("");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Space") {
            dispatchCreate(e.currentTarget.value);
            setTaskText("");
          }
        }}
      >
        <PlusIcon className="h-6 w-6 text-light" />
      </button>
    </div>
  );
}

export default CreateTask;
