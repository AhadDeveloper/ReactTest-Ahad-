import { useState, useContext } from "react";
import context from "../../context/context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const signupSchema = z
  .object({
    name: z.string().min(2, "name should be greater than 2"),
    email: z.string().email(),
    password: z.string().min(8, "password should be greater than 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

const SignupPage = () => {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const ctx = useContext(context);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ values: initialValues, resolver: zodResolver(signupSchema) });

  const submitHandler = (data) => {
    const allCompanies = [];
    const getCompanies = JSON.parse(localStorage.getItem("companies"));
    if (getCompanies) {
      for (const company of getCompanies) {
        allCompanies.push(company);
      }
    }
    const companyData = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      id: Math.random().toString(),
    };
    allCompanies.push(companyData);
    localStorage.setItem("companies", JSON.stringify(allCompanies));
    const companyId = companyData.id;
    ctx.loginUser({
      email: data.email,
      password: data.password,
      id: companyId,
    });
    ctx.userAuthenticated();
    setIsSuccessful(true);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center mt-20 gap-20">
      <h1 className="text-3xl text-orange-500">Create Company</h1>
      <form
        className="flex flex-col gap-6 items-center h-screen"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="flex flex-col gap-7">
          <div className="flex justify-between w-80">
            <label>Company Name: </label>
            <input {...register("name")} type="text" />
          </div>
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          <div className="flex justify-between w-80">
            <label>Email: </label>
            <input {...register("email")} type="email" />
          </div>
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <div className="flex justify-between w-80">
            <label>Password: </label>
            <input {...register("password")} type="password" />
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <div className="flex justify-between w-80">
            <label>Confirm Password: </label>
            <input {...register("confirmPassword")} type="password" />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <button className="p-2 bg-orange-400 text-white rounded-md">
            Create Company
          </button>
          {errors.root && <p>{errors.root.message}</p>}
          {isSuccessful && <p className="text-green-700">Company Added</p>}
        </div>
        <Link to="/signin" className="text-blue-700 underline">
          Signin page
        </Link>
      </form>
    </div>
  );
};

export default SignupPage;
