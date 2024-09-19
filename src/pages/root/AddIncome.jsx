import { useContext } from "react";
import context from "../../context/context";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const initialValues = {
  name: "",
  income: "",
};

const addIncomeSchema = z.object({
  name: z.string().min(2, "name should be greater than 2 characters"),
  income: z.string(),
});

const AddIncomePage = () => {
  const ctx = useContext(context);
  const navigate = useNavigate();
  const isAuthenticated = ctx.checkAuthenticated();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset,
  } = useForm({
    values: initialValues,
    resolver: zodResolver(addIncomeSchema),
  });

  const submitHandler = (data) => {
    console.log(data);
    const getKey = ctx.getCompanyKey();
    const incomeKey = JSON.parse(localStorage.getItem(getKey));
    const newArr = [...incomeKey.income];
    newArr.push({ name: data.name, income: data.income });
    localStorage.setItem(getKey, JSON.stringify({ income: newArr }));
    navigate("/income");
  };

  if (!isAuthenticated) {
    return (
      <div className="py-10 flex flex-col items-center gap-7">
        <p className="text-red-500 text-2xl">You can't access this page!</p>
        <Link to="/signup" className="text-blue-500 text-xl underline">
          Go to Signup
        </Link>
      </div>
    );
  }
  return (
    <div className="mt-10 flex flex-col items-center gap-8">
      <h1 className="text-2xl text-purple-700">Add Income</h1>
      <form
        className="flex flex-col gap-7 items-center"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="flex gap-3">
          <label>Enter your name: </label>
          <input {...register("name")} type="text" />
        </div>
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <div className="flex gap-3">
          <label>Enter your income: </label>
          <input {...register("income")} type="number" />
        </div>
        {errors.income && (
          <p className="text-red-500">{errors.income.message}</p>
        )}
        <div>
          <button className="px-4 py-2 bg-purple-500 rounded-md text-white">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddIncomePage;
