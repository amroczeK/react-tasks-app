import { useCallback, useContext, useState } from "react";
import { Task } from "../App";
import { TasksDispatchContext } from "../context/TasksContext";

type Props = {
  task: Task;
};

function TaskInput({ task }: Props) {
  const dispatch = useContext(TasksDispatchContext);
  const [currentText, setCurrentText] = useState<string>(task.text);

  const updateTextHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCurrentText(e.currentTarget.value);

  // Cache function so it's not re-created between re-renders when state changes
  const updateTask = useCallback(
    (id: number, text: string) => {
      dispatch({ type: "UPDATE", id, text });
    },
    [dispatch]
  );

  return (
    <input
      className="w-full bg-primary text-light line-clamp-1 rounded-sm pl-1.5"
      type="text"
      value={currentText}
      onChange={updateTextHandler}
      onKeyDown={(e) =>
        e.currentTarget.value !== task.text &&
        e.key === "Enter" &&
        updateTask(task.id, e.currentTarget.value)
      }
      onBlur={(e) =>
        e.currentTarget.value !== task.text &&
        dispatch({ type: "UPDATE", id: task.id, text: e.currentTarget.value })
      }
    />
  );
}

export default TaskInput;
