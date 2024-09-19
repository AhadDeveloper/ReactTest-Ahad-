import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import context from "../../context/context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const initialValues = {
  email: "",
  password: "",
};

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "password should be greater than 8 characters"),
});

const SigninPage = () => {
  const navigate = useNavigate();
  const ctx = useContext(context);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset,
  } = useForm({ values: initialValues, resolver: zodResolver(signinSchema) });

  const submitHandler = (data) => {
    const companies = JSON.parse(localStorage.getItem("companies"));
    if (companies) {
      for (const company of companies) {
        if (
          company.email === data.email &&
          company.password === data.password
        ) {
          reset();
          ctx.loginUser({
            email: data.email,
            password: data.password,
            id: company.id,
          });
          ctx.userAuthenticated();
          navigate("/");
        }
      }
    }
    setError("root", {
      type: "manual",
      message: "No compay exist by this information",
    });
  };

  return (
    <div className="flex flex-col items-center mt-20 gap-20">
      <h1 className="text-3xl text-orange-500">Login Company</h1>
      <form
        className="flex flex-col gap-6 items-center h-screen"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="flex flex-col gap-7">
          <div className="flex justify-between w-80">
            <label>Company Email: </label>
            <input {...register("email")} type="email" />
          </div>
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <div className="flex justify-between w-80">
            <label>Company Password: </label>
            <input {...register("password")} type="password" />
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <button className="p-2 bg-orange-400 text-white rounded-md">
            Login
          </button>
        </div>
        {errors.root && <p className="text-red-600">{errors.root.message}</p>}
        <Link to="/signup" className="text-blue-700 underline">
          Signup page
        </Link>
      </form>
    </div>
  );
};

export default SigninPage;
