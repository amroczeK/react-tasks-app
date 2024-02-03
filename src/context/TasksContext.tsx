import { Dispatch, createContext } from "react";
import { TaskAction, TaskState } from "../App";

export const TasksContext = createContext<TaskState>({ tasks: [] });
export const TasksDispatchContext = createContext<Dispatch<TaskAction>>(
  () => null
);
