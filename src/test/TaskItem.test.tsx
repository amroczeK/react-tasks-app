import { render, screen } from "@testing-library/react";
import TaskItem from "../components/TaskItem";
import { Task } from "../App";

describe("Task item", () => {
  it("renders task item with task.", () => {
    const task: Task = {
      id: Date.now(),
      text: "My first task.",
      completed: false,
    };
    render(<TaskItem task={task} />);
    expect(screen.getByTestId(`task-${task.id}`));
    expect(screen.getByTestId(`task-input-${task.id}`));
    expect(screen.getByTestId(`task-input-${task.id}`)).toHaveValue(task.text);
  });
});
