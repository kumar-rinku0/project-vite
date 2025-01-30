import { Outlet } from "react-router";

const Header = () => {
  return (
    <div>
      {/* will either be <Home/> or <Settings/> */}
      <Outlet />
    </div>
  );
};

export default Header;
