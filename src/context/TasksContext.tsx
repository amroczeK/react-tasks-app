import { Dispatch, createContext } from "react";
import { TaskAction, TaskState } from "../App";

const initialState: TaskState = { tasks: [] };
export const TasksContext = createContext<TaskState>(initialState);
export const TasksDispatchContext = createContext<Dispatch<TaskAction>>(
  () => null
);
