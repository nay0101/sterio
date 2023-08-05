import { publicRequest } from "../request-methods";
import { useEffect, useState } from "react";
import UserActionButtons from "../components/UsersActionButtons";
import Table from "../components/Table";
import { Add } from "@mui/icons-material";
import UserModal from "../components/UserModal";
import dayjs from "dayjs";
import AdminTitleBar from "../components/AdminTitleBar";

const Users = () => {
  const [normalUsers, setNormalUsers] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");
  const [userType, setUserType] = useState("");
  const [userData, setUserData] = useState("");

  const normalUserColumns = [
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Subscription Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Subscription Fees",
      selector: (row) => row.fees,
      sortable: true,
    },
    {
      name: "Subscription Remaining",
      selector: (row) => row.remaining,
      sortable: true,
    },
    {
      name: "Last Modified Timestamp",
      selector: (row) => row.lastModified,
      sortable: true,
    },
    {
      name: "Actions",
      button: "true",
      cell: (data) => (
        <UserActionButtons
          id={data.id}
          setNormalUsers={setNormalUsers}
          setAdminUsers={setAdminUsers}
          normalUsers={normalUsers}
          adminUsers={adminUsers}
          setUserData={setUserData}
          type="normal"
          setOpen={setOpen}
          setAction={setAction}
          setUserType={setUserType}
        />
      ),
    },
  ];

  const adminUserColumns = [
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Last Modified Timestamp",
      selector: (row) => row.lastModified,
      sortable: true,
    },
    {
      name: "Actions",
      button: "true",
      cell: (data) => (
        <UserActionButtons
          id={data.id}
          setNormalUsers={setNormalUsers}
          setAdminUsers={setAdminUsers}
          normalUsers={normalUsers}
          adminUsers={adminUsers}
          setUserData={setUserData}
          type="admin"
          setOpen={setOpen}
          setAction={setAction}
          setUserType={setUserType}
        />
      ),
    },
  ];

  const getSubscription = async () => {
    const { result } = (await publicRequest.get(`/subscription`)).data;
    return result;
  };

  const getNormalUsers = async () => {
    try {
      let users = [];
      const { result } = (await publicRequest.get("/users")).data;
      const subscriptions = await getSubscription();
      result.forEach((user) => {
        const subscription = subscriptions.filter(
          (s) => s.user_id === user._id
        );
        users = [
          ...users,
          {
            id: user._id,
            username: user.username,
            email: user.email,
            status: subscription[0]?.subscription_status,
            fees: `$ ${subscription[0]?.subscription_fees}`,
            remaining: `${subscription[0]?.subscription_duration} Days`,
            lastModified: dayjs(user.updatedAt).format("DD/MM/YY hh:mm:ss A"),
          },
        ];
      });
      setNormalUsers(users);
    } catch (error) {
      console.log(error);
    }
  };

  const getAdminUsers = async () => {
    try {
      let users = [];
      const { result } = (await publicRequest.get("/users/getAdmins")).data;
      result.forEach((user) => {
        users = [
          ...users,
          {
            id: user._id,
            username: user.username,
            email: user.email,
            lastModified: dayjs(user.updatedAt).format("DD/MM/YY hh:mm:ss A"),
          },
        ];
      });
      setAdminUsers(users);
    } catch (error) {
      console.log(error);
    }
  };

  const openAddModal = (type, action) => {
    setUserType(type);
    setAction(action);
    setOpen(true);
  };

  const TableTitle = ({ name, type }) => {
    return (
      <div className="flex flex-wrap items-center gap-5 ">
        <p className="text-2xl">{name}</p>
        <button
          className="flex items-center justify-center border border-teal-700 rounded px-2 py-1 text-2xl text-teal-700 hover:bg-teal-700 hover:text-white"
          onClick={() => openAddModal(type, "add")}
        >
          <Add fontSize="" />
        </button>
      </div>
    );
  };

  useEffect(() => {
    getNormalUsers();
    getAdminUsers();
  }, [open]);

  return (
    <>
      <div className="py-5 pr-5">
        <AdminTitleBar />
        <div className="mt-10">
          <Table
            title={<TableTitle name="Normal Users" type="normal" />}
            data={normalUsers}
            columns={normalUserColumns}
          />
        </div>
        <div className="mt-10">
          <Table
            title={<TableTitle name="Admin Users" type="admin" />}
            data={adminUsers}
            columns={adminUserColumns}
          />
        </div>
      </div>
      {open && (
        <UserModal
          setOpen={setOpen}
          action={action}
          userType={userType}
          userData={userData}
          setNormalUsers={setNormalUsers}
          setAdminUsers={setAdminUsers}
        />
      )}
    </>
  );
};

export default Users;
