import { Outlet } from "react-router";
import Header from "./components/Header";

const AppLayout = ({ user, setUser }) => {
  return (
    <div>
      <Header user={user} setUser={setUser} />
      <Outlet />
    </div>
  );
};

export default AppLayout;
