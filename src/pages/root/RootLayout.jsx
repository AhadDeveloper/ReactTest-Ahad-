import { Outlet } from "react-router-dom";
import Header from "../../components/Header";

const RootLayoutPage = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default RootLayoutPage;
