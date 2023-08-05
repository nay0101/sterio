import { Delete, Edit } from "@mui/icons-material";
import { publicRequest } from "../request-methods";

const ActionButtons = ({
  id,
  setNormalUsers,
  setAdminUsers,
  type,
  setOpen,
  setAction,
  setUserType,
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
    // if (await publicRequest.put(`/users/${id}`)) {
    //   setNormalUsers((prev) => prev.filter((user) => user.id !== id));
    //   setAdminUsers((prev) => prev.filter((user) => user.id !== id));
    // }
  };

  return (
    <div className="flex gap-2">
      <Edit className="text-green-700 cursor-pointer" onClick={editUser} />
      <Delete className="text-red-700 cursor-pointer" onClick={deleteUser} />
    </div>
  );
};

export default ActionButtons;
