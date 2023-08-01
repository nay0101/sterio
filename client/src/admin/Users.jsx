import DataTable from "react-data-table-component";
import { publicRequest } from "../request-methods";
import { useEffect, useMemo, useState } from "react";
import ActionButtons from "../components/ActionButtons";

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

  const convertArrayOfObjectsToCSV = (array) => {
    let result;
    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(normalUsers[0]);
    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;
    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });
    return result;
  };

  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }

  const Export = ({ onExport }) => <button onClick={onExport}>Export</button>;

  const reportNormalUser = useMemo(
    () => <Export onExport={() => downloadCSV(normalUsers)} />,
    [normalUsers]
  );

  const reportAdminUser = useMemo(
    () => <Export onExport={() => downloadCSV(adminUsers)} />,
    [adminUsers]
  );

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

  useEffect(() => {
    getNormalUsers();
  }, []);

  useEffect(() => {
    getAdminUsers();
  }, []);

  return (
    <div className="py-5 pr-5">
      <p className="uppercase text-3xl">Users</p>
      <div className="mt-10">
        <DataTable
          title="Normal Users"
          columns={normalUserColumns}
          data={normalUsers}
          actions={reportNormalUser}
          pagination
        />
      </div>
      <div className="mt-10">
        <DataTable
          title="Admin Users"
          columns={adminUserColumns}
          data={adminUsers}
          actions={reportAdminUser}
          pagination
        />
      </div>
    </div>
  );
};

export default Users;
