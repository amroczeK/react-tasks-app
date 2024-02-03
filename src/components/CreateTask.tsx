import { PlusIcon } from "@heroicons/react/24/solid";
import { useCallback, useContext, useState } from "react";
import { TasksDispatchContext } from "../context/TasksContext";

function CreateTask() {
  const dispatch = useContext(TasksDispatchContext);
  const [taskText, setTaskText] = useState<string>("");

  // Cache function so it's not re-created between re-renders when state changes
  const createTask = useCallback(
    (text: string) => {
      if (text) dispatch({ type: "CREATE", text });
    },
    [dispatch]
  );

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
            createTask(e.currentTarget.value);
            setTaskText("");
          }
        }}
      />
      <button
        aria-label="Add the task to list"
        className="p-1 rounded-md hover:bg-secondary self-center"
        onClick={() => {
          createTask(taskText);
          setTaskText("");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Space") {
            createTask(taskText);
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
