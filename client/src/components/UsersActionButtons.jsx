import { Delete, Edit } from "@mui/icons-material";
import { publicRequest } from "../request-methods";

const UserActionButtons = ({
  id,
  setNormalUsers,
  setAdminUsers,
  normalUsers,
  adminUsers,
  type,
  setOpen,
  setAction,
  setUserType,
  setUserData,
}) => {
  const deleteUser = async () => {
    if (type === "normal") {
      if (await publicRequest.delete(`/users/${id}`)) {
        setNormalUsers((prev) => prev.filter((user) => user.id !== id));
      }
    }
    if (type === "admin") {
      if (await publicRequest.delete(`/users/${id}`)) {
        setAdminUsers((prev) => prev.filter((user) => user.id !== id));
      }
    }
  };

  const editUser = () => {
    setAction("edit");
    setUserType(type);
    setOpen(true);
    if (type == "normal")
      setUserData(normalUsers.filter((user) => user.id === id));
    if (type == "admin")
      setUserData(adminUsers.filter((user) => user.id === id));
  };

  return (
    <div className="flex gap-2">
      <Edit className="text-green-700 cursor-pointer" onClick={editUser} />
      {id !== "64c8c7332ec7e6907cdaf7bf" && (
        <Delete className="text-red-700 cursor-pointer" onClick={deleteUser} />
      )}
    </div>
  );
};

export default UserActionButtons;
