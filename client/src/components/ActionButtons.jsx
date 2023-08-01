import { Delete, Edit } from "@mui/icons-material";
import { publicRequest } from "../request-methods";

const ActionButtons = ({ id, setNormalUsers, setAdminUsers }) => {
  const deleteUser = async () => {
    if (await publicRequest.delete(`/users/${id}`)) {
      setNormalUsers((prev) => prev.filter((user) => user.id !== id));
      setAdminUsers((prev) => prev.filter((user) => user.id !== id));
    }
  };
  return (
    <div className="flex gap-2">
      <Edit className="text-green-700 cursor-pointer" />
      <Delete className="text-red-700 cursor-pointer" onClick={deleteUser} />
    </div>
  );
};

export default ActionButtons;
