const SideNav = ({ tab, setTab }) => {
  const changeTab = (name) => {
    setTab(name);
  };
  return (
    <nav className="flex flex-col items-center w-full bg-teal-700 min-h-screen h-full p-5">
      <div className="mb-10 text-2xl uppercase font-bold">
        <p>Sterio</p>
      </div>
      <div className="flex flex-col text-xl text-white w-full">
        <div
          onClick={() => changeTab("home")}
          className="flex justify-center py-5 cursor-pointer border-y hover:bg-teal-800"
        >
          Dashboard
        </div>
        <div
          onClick={() => changeTab("users")}
          className="flex justify-center py-5 cursor-pointer border-b hover:bg-teal-800"
        >
          User
        </div>
        <div
          onClick={() => changeTab("films")}
          className="flex justify-center py-5 cursor-pointer border-b hover:bg-teal-800"
        >
          Film
        </div>
      </div>
    </nav>
  );
};

export default SideNav;
