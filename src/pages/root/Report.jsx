import { useContext } from "react";
import context from "../../context/context";

const ReportPage = () => {
  const ctx = useContext(context);
  const key = ctx.getCompanyKey();
  const incomes = JSON.parse(localStorage.getItem(key))?.income;

  return (
    <div>
      <h1 className="text-2xl text-orange-500">Reports</h1>
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

export default ReportPage;
