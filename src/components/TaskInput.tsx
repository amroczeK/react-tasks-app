import { useState } from "react";
import { Task } from "../App";

type Props = {
  task: Task;
  dispatchHandler: (id: number, text: string) => void;
};

function TaskInput({ task, dispatchHandler }: Props) {
  const [currentText, setCurrentText] = useState<string>(task.text);

  const updateTextHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCurrentText(e.currentTarget.value);

  return (
    <input
      className="w-full bg-primary text-light line-clamp-1 rounded-sm pl-1.5"
      type="text"
      value={currentText}
      onChange={updateTextHandler}
      onKeyDown={(e) =>
        e.currentTarget.value !== task.text &&
        e.key === "Enter" &&
        dispatchHandler(task.id, e.currentTarget.value)
      }
      onBlur={(e) =>
        e.currentTarget.value !== task.text &&
        dispatchHandler(task.id, e.currentTarget.value)
      }
    />
  );
}

export default TaskInput;
