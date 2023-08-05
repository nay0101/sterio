import { useDispatch, useSelector } from "react-redux";
import { changeTab } from "../store/dashboard-slice";

const SideNav = () => {
  const dispatch = useDispatch();
  const { tab } = useSelector((store) => store.tab);

  const goToTab = (name) => {
    dispatch(changeTab({ tab: name }));
  };

  return (
    <nav className="flex flex-col items-center w-full bg-teal-700 min-h-screen h-full p-5">
      <div className="mb-10 text-2xl uppercase font-bold">
        <p>Sterio</p>
      </div>
      <div className="flex flex-col text-xl text-white w-full">
        <div
          onClick={() => goToTab("home")}
          className={`flex justify-center py-5 cursor-pointer border-y ${
            tab === "home"
              ? "bg-white text-teal-700"
              : "hover:bg-teal-800 hover:text-white"
          }`}
        >
          Dashboard
        </div>
        <div
          onClick={() => goToTab("users")}
          className={`flex justify-center py-5 cursor-pointer border-b ${
            tab === "users"
              ? "bg-white text-teal-700"
              : "hover:bg-teal-800 hover:text-white"
          }`}
        >
          User
        </div>
        <div
          onClick={() => goToTab("films")}
          className={`flex justify-center py-5 cursor-pointer border-b ${
            tab === "films"
              ? "bg-white text-teal-700"
              : "hover:bg-teal-800 hover:text-white"
          }`}
        >
          Film
        </div>
      </div>
    </nav>
  );
};

export default SideNav;
