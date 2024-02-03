import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";

function FilterButton() {
  return (
    <button
      aria-label="Task filter"
      className="p-1 rounded-md hover:bg-secondary self-center"
      onClick={() => alert("Hello")}
    >
      <AdjustmentsHorizontalIcon className="h-6 w-6 text-light" />
    </button>
  );
}

export default FilterButton;
