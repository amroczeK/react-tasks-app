import { memo } from "react";
import { Task } from "../App";
import DeleteButton from "./DeleteButton";
import TaskInput from "./TaskInput";
import ToggleButton from "./ToggleButton";

type Props = {
  task: Task;
};

// Memoize component so that it skips re-rendering if props are unchanged
// If you do not do this, all TaskItems component in the list will re-render
// whenever a task is created, updated, or deleted
const TaskItem = memo(function ({ task }: Props) {
  return (
    <li
      id="task-container"
      data-testid={`task-${task.id}`}
      key={task.id}
      aria-description={task.text}
      className={`flex gap-4 items-center h-fit max-h-24 rounded-md border border-secondary hover:bg-secondary p-4 text-light text-md ${
        task.completed && "line-through"
      }`}
    >
      <ToggleButton task={task} />
      <TaskInput task={task} />
      <DeleteButton task={task} />
    </li>
  );
});

export default TaskItem;
