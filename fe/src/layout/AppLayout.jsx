import { Outlet } from "react-router";
import Header from "./components/Header";

const AppLayout = ({ user }) => {
  return (
    <div>
      <Header user={user} />
      <Outlet />
    </div>
  );
};

export default AppLayout;
