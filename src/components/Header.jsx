import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import context from "../context/context";

const Header = () => {
  const ctx = useContext(context);
  const navigate = useNavigate();

  return (
    <header className="px-10 h-16 bg-orange-400 text-white text-xl">
      <nav className="flex justify-between items-center h-full">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${isActive && "text-gray-600"} p-2 hover:border hover:border-white`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/income"
          className={({ isActive }) =>
            `${isActive && "text-gray-600"} p-2 hover:border hover:border-white`
          }
        >
          Income
        </NavLink>
        <NavLink
          to="/expense"
          className={({ isActive }) =>
            `${isActive && "text-gray-600"} p-2 hover:border hover:border-white`
          }
        >
          Expenses
        </NavLink>
        <NavLink
          to="/report"
          className={({ isActive }) =>
            `${isActive && "text-gray-600"} p-2 hover:border hover:border-white`
          }
        >
          Reports
        </NavLink>
        <button
          onClick={() => {
            ctx.deleteUser();
            navigate("/signup");
          }}
          className="p-2 hover:border hover:border-white"
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
