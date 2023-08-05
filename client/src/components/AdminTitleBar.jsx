import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/admin-actions";
import { changeTab } from "../store/dashboard-slice";

const AdminTitleBar = () => {
  const dispatch = useDispatch();
  const { username } = useSelector((store) => store.admin.currentUser);
  const { tab } = useSelector((store) => store.tab);

  const adminLogout = () => {
    dispatch(logout());
    dispatch(changeTab({ tab: "home" }));
  };

  return (
    <div className="flex justify-between items-center">
      <p className="uppercase text-3xl">{tab}</p>
      <div className="flex items-center border px-5 py-2 rounded gap-5 text-xl">
        <p className="uppercase text-teal-700 font-bold">{username}</p>
        <button
          onClick={adminLogout}
          className="uppercase font-bold cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminTitleBar;
