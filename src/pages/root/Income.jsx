import { useContext } from "react";
import { Link } from "react-router-dom";
import context from "../../context/context";

const IncomePage = () => {
  const ctx = useContext(context);
  const key = ctx.getCompanyKey();
  const incomes = JSON.parse(localStorage.getItem(key))?.income;
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-8">
      <Link
        to="/income/add-income"
        className="p-2 bg-purple-600 text-white rounded-md"
      >
        Add Income
      </Link>
      <h1 className="text-2xl">Incomes</h1>
      <ul className="flex flex-col gap-7">
        {incomes?.map((item) => (
          <li key={Math.random()}>
            <p>{item.name}</p>
            <p>{item.income}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncomePage;
