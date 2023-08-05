import SideNav from "../components/SideNav";
import Users from "./Users";
import Home from "./Home";
import Films from "./Films";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { tab } = useSelector((store) => store.tab);
  return (
    <section className="grid grid-cols-5 gap-10">
      <div className="col-span-1 relative">
        <SideNav />
      </div>
      <div className="col-span-4">
        {tab === "home" && <Home />}
        {tab === "users" && <Users />}
        {tab == "films" && <Films />}
      </div>
    </section>
  );
};

export default Dashboard;
