import React, { useState } from "react";
import googleLogo from "../../../assets/google.svg";
import { login } from "../../../store/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    dispatch(login({ email, password }));
  };

  return (
    <form
      className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">
        Sign In
      </h3>
      <p className="mb-4 text-grey-700">Enter your email and password</p>
      <a className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium border border-slate-300 rounded-full">
        <img src={googleLogo} className="h-5 mr-5" />
        Sign in with Google
      </a>

      <div className="flex items-center mb-3">
        <hr className="h-0 border-b border-solid border-grey-500 grow" />
        <p className="mx-4 text-grey-600">or</p>
        <hr className="h-0 border-b border-solid border-grey-500 grow" />
      </div>
      <label htmlFor="email" className="mb-2 text-sm text-start text-grey-900">
        Email<span className="text-red-500">*</span>
      </label>
      <input
        id="email"
        type="email"
        placeholder="mail@loopple.com"
        className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
      />
      <label
        htmlFor="password"
        className="mb-2 text-sm text-start text-grey-900"
      >
        Password<span className="text-red-500">*</span>
      </label>
      <input
        id="password"
        type="password"
        placeholder="Enter a password"
        className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
      />
      <div className="flex flex-row justify-between mb-8">
        <label className="relative inline-flex items-center mr-3 cursor-pointer select-none">
          <input type="checkbox" checked="" value="" className="sr-only peer" />
          <input
            type="checkbox"
            name=""
            id=""
            className="w-5 h-5 bg-white border-2 rounded-sm border-grey-500 peer peer-checked:border-0 peer-checked:bg-red-500"
          />
          <span className="ml-3 text-sm font-normal text-grey-900">
            Keep me logged in
          </span>
        </label>
        <a href="" className="mr-4 text-sm font-medium text-purple-blue-500">
          Forget password?
        </a>
      </div>

      <button className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-red-400">
        Sign In
      </button>
      <p className="text-sm leading-relaxed text-grey-900">
        Not registered yet?{" "}
        <a href="/auth/register" className="font-bold text-grey-700">
          Create an Account
        </a>
      </p>
    </form>
  );
};

export default Login;
