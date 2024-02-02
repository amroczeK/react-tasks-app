import {
  AdjustmentsHorizontalIcon,
  CheckCircleIcon,
  PlusIcon,
} from "@heroicons/react/16/solid";
import {
  CheckCircleIcon as UncheckedCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useReducer } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
}

type TaskAction =
  | { type: "create"; text: string }
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
    case "toggle": {
      console.log("HERE");
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

function ToggleButton({
  completed = false,
  onClick,
}: {
  completed: boolean;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick}>
      {completed ? (
        <CheckCircleIcon className="h-6 w-6 text-light" />
      ) : (
        <UncheckedCircleIcon className="h-6 w-6 text-secondary group-hover:text-light" />
      )}
    </button>
  );
}

function App() {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const currentDate = new Date();

  const createTask = (text: string) =>
    text && dispatch({ type: "create", text });
  const toggleTask = (id: number) => dispatch({ type: "toggle", id });
  const deleteTodo = (id: number) => dispatch({ type: "delete", id });

  return (
    <main>
      <div className=" bg-primary h-screen w-screen p-4 flex justify-center items-center">
        <div className="flex flex-col p-4 w-full h-2/3 sm:w-[640px] border border-secondary rounded-xl gap-4">
          <div id="header-container" className="flex justify-between">
            <header tabIndex={0}>
              <h1 className="text-light text-xl">Today's list</h1>
              <time
                className="text-sm text-light"
                aria-description="Today's date"
                tabIndex={0}
                dateTime={currentDate.toISOString()}
              >
                {currentDate.toDateString()}
              </time>
            </header>
            <button
              aria-label="Task's filter"
              className="p-1 rounded-md hover:bg-secondary self-center"
              onClick={() => alert("Hello")}
            >
              <AdjustmentsHorizontalIcon className="h-6 w-6 text-light" />
            </button>
          </div>
          <div className="flex items-center bg-primary border border-secondary rounded-md p-1.5 gap-1">
            <input
              type="text"
              className="w-full bg-primary text-light placeholder-secondar pl-1.5"
              placeholder="Add a task"
              onKeyDown={(e) =>
                e.key === "Enter" && createTask(e.currentTarget.value)
              }
            />
            <button
              aria-label="Add the task to list"
              className="p-1 rounded-md hover:bg-secondary self-center"
              onClick={(e) => createTask(e.currentTarget.value)}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === "Space") &&
                createTask(e.currentTarget.value)
              }
            >
              <PlusIcon className="h-6 w-6 text-light" />
            </button>
          </div>
          <ul
            aria-label="Today's tasks"
            tabIndex={0}
            id="todos-container"
            className="flex flex-col gap-2 overflow-auto"
          >
            {state.tasks.map((task) => (
              <li
                key={task.id}
                aria-label="first task"
                className={`group flex gap-4 items-center h-fit max-h-24 rounded-md border border-secondary hover:bg-secondary cursor-pointer p-4 text-light text-md ${
                  task.completed && "line-through"
                }`}
                onClick={() => toggleTask(task.id)}
              >
                <ToggleButton
                  completed={task.completed}
                  onClick={() => toggleTask(task.id)}
                />
                <div className="w-full overflow-hidden">
                  <p className="line-clamp-1">{task.text}</p>
                </div>
                <button
                  className="p-1 rounded-md hover:bg-white text-light hover:text-primary"
                  onClick={() => deleteTodo(task.id)}
                >
                  <TrashIcon className="h-6 w-6" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default App;
