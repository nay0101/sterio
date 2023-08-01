import { publicRequest } from "../request-methods";
import { useEffect, useState } from "react";
import ActionButtons from "../components/ActionButtons";
import Table from "../components/Table";
import { Add } from "@mui/icons-material";

const Users = () => {
  const [normalUsers, setNormalUsers] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);

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
      name: "Actions",
      button: "true",
      cell: (data) => (
        <ActionButtons
          id={data.id}
          setNormalUsers={setNormalUsers}
          setAdminUsers={setAdminUsers}
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
      name: "Actions",
      button: "true",
      cell: (data) => (
        <ActionButtons
          id={data.id}
          setNormalUsers={setNormalUsers}
          setAdminUsers={setAdminUsers}
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
          { id: user._id, username: user.username, email: user.email },
        ];
      });
      setAdminUsers(users);
    } catch (error) {
      console.log(error);
    }
  };

  const TableTitle = ({ name }) => {
    return (
      <div className="flex flex-wrap items-center gap-5 ">
        <p className="text-2xl">{name}</p>
        <button className="flex items-center justify-center border border-teal-700 rounded px-2 py-1 text-2xl text-teal-700 hover:bg-teal-700 hover:text-white">
          <Add fontSize="" />
        </button>
      </div>
    );
  };

  useEffect(() => {
    getNormalUsers();
    getAdminUsers();
  }, []);

  return (
    <div className="py-5 pr-5">
      <p className="uppercase text-3xl">Users</p>
      <div className="mt-10">
        <Table
          title={<TableTitle name="Normal Users" />}
          data={normalUsers}
          columns={normalUserColumns}
        />
      </div>
      <div className="mt-10">
        <Table
          title={<TableTitle name="Admin Users" />}
          data={adminUsers}
          columns={adminUserColumns}
        />
      </div>
    </div>
  );
};

export default Users;
