import  Header  from "../Header/Header";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="app">
        <Header />
        <Outlet />
    </div>
  );
}

export default AppLayout;