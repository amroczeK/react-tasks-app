import FilterButton from "./FilterButton";

function Header() {
  const currentDate = new Date();

  return (
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
      <FilterButton />
    </div>
  );
}

export default Header;
