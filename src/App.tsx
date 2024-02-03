import { useReducer } from "react";
import TaskItem from "./components/TaskItem";
import Header from "./components/Header";
import CreateTask from "./components/CreateTask";
import { TasksContext, TasksDispatchContext } from "./context/TasksContext";

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export interface TaskState {
  tasks: Task[];
}

// Discriminated unions
export type TaskAction =
  | { type: "CREATE"; text: string }
  | { type: "UPDATE"; id: number; text: string }
  | { type: "TOGGLE"; id: number }
  | { type: "DELETE"; id: number };

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case "CREATE": {
      const newTask: Task = {
        id: Date.now(),
        text: action.text,
        completed: false,
      };
      return { tasks: [...state.tasks, newTask] };
    }
    case "UPDATE": {
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, text: action.text } : task
        ),
      };
    }
    case "TOGGLE": {
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, completed: !task.completed } : task
        ),
      };
    }
    case "DELETE":
      return {
        tasks: state.tasks.filter((task) => task.id !== action.id),
      };
    default:
      return state;
  }
}

const initialState: TaskState = { tasks: [] };

function App() {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TasksContext.Provider value={state}>
      <TasksDispatchContext.Provider value={dispatch}>
        <main>
          <div className=" bg-primary h-screen w-screen p-4 flex justify-center items-center">
            <div className="flex flex-col p-4 w-full h-2/3 sm:w-[640px] border border-secondary rounded-xl gap-4">
              <Header />
              <CreateTask />
              <ul
                aria-label="Today's tasks"
                tabIndex={0}
                id="todos-container"
                className="flex flex-col gap-2 overflow-auto"
              >
                {state.tasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </ul>
            </div>
          </div>
        </main>
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export default App;
