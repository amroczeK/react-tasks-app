import { useReducer } from "react";
import Header from "./components/Header";
import CreateTask from "./components/CreateTask";
import { TasksContext, TasksDispatchContext } from "./context/TasksContext";
import TaskList from "./components/TaskList";
import { produce } from "immer";

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
      // Find and update the task using immer immutability library
      // This makes our original state immutable by cloning original state and returning new state
      // This will improve performance by minimizing operations performend on large arrays
      // Time Complexity: O(n), where n is the number of tasks in the array. This is due to the linear search to find the task.
      // Space Complexity: Close to O(1), as Immer uses a copy-on-write mechanism and efficiently manages the draft and final state, especially when only a small part of the state is changed.
      const newState = produce(state, (draftState) => {
        const task = draftState.tasks.find((task) => task.id === action.id);
        if (task) {
          task.text = action.text;
        }
      });
      return newState;
    }
    case "TOGGLE": {
      // Find and update the task completion status using immer immutability library
      // This makes our original state immutable by cloning original state and returning new state
      // This will improve performance by minimizing operations performend on large arrays
      const newState = produce(state, (draftState) => {
        const task = draftState.tasks.find((task) => task.id === action.id);
        if (task) {
          task.completed = !task.completed;
        }
      });
      return newState;
    }
    case "DELETE": {
      // Find and delete the task using immer immutability library
      // This makes our original state immutable by cloning original state and returning new state
      // This will improve performance by minimizing operations performend on large arrays
      const newState = produce(state, (draftState) => {
        const index = draftState.tasks.findIndex(
          (task) => task.id === action.id
        );
        if (index !== -1) {
          draftState.tasks.splice(index, 1);
        }
      });
      return newState;
    }

    default:
      return state;
  }
}

const initialState: TaskState = { tasks: [] };

/**
 * If list of tasks is very long, consider implementing windowing or virtualization techniques
 * to improve performance and efficieny rendering large sets of data/elements.
 * Use react-window or react-virtualized packages to achieve this easily.
 * Use cases: Displaying large tables or infinite scrolling.
 */
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
              <TaskList />
            </div>
          </div>
        </main>
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export default App;
