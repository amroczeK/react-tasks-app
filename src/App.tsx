import { useCallback, useReducer } from "react";
import TaskItem from "./components/TaskItem";
import Header from "./components/Header";
import CreateTask from "./components/CreateTask";

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
}

type TaskAction =
  | { type: "create"; text: string }
  | { type: "update"; id: number; text: string }
  | { type: "toggle"; id: number }
  | { type: "delete"; id: number };

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case "create": {
      const newTask: Task = {
        id: Date.now(),
        text: action.text,
        completed: false,
      };
      return { tasks: [...state.tasks, newTask] };
    }
    case "update": {
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, text: action.text } : task
        ),
      };
    }
    case "toggle": {
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, completed: !task.completed } : task
        ),
      };
    }
    case "delete":
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

  // Cache dispatch functions so they are not re-created between re-renders when state changes
  const createTask = useCallback(
    (text: string) => {
      if (text) dispatch({ type: "create", text });
    },
    [dispatch]
  );

  const updateTask = useCallback(
    (id: number, text: string) => {
      dispatch({ type: "update", id, text });
    },
    [dispatch]
  );

  const toggleTask = useCallback(
    (id: number) => {
      dispatch({ type: "toggle", id });
    },
    [dispatch]
  );

  const deleteTask = useCallback(
    (id: number) => {
      dispatch({ type: "delete", id });
    },
    [dispatch]
  );

  return (
    <main>
      <div className=" bg-primary h-screen w-screen p-4 flex justify-center items-center">
        <div className="flex flex-col p-4 w-full h-2/3 sm:w-[640px] border border-secondary rounded-xl gap-4">
          <Header />
          <CreateTask dispatchCreate={createTask} />
          <ul
            aria-label="Today's tasks"
            tabIndex={0}
            id="todos-container"
            className="flex flex-col gap-2 overflow-auto"
          >
            {state.tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                dispatchToggle={toggleTask}
                dispatchUpdate={updateTask}
                dispatchDelete={deleteTask}
              />
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default App;
