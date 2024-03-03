import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createUserAsync } from "../AuthSlice";
import { selectLoggedUsers } from "../AuthSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SignUpAuth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const dispatch = useDispatch();
  const onSubmit = (data) => dispatch(createUserAsync({email: data.email, password: data.password}));

  const validatePassword = (value) => {
    // Add your custom password validation logic here
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
    return passwordRegex.test(value);
  };

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div>
      <div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create a new account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              noValidate
              className="space-y-6 text-left"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                        message: "Invalid email format",
                      },
                    })}
                    type="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email && (
                    <p className="text-red-600"> {errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                {/* Password */}
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                      validate: (value) =>
                        validatePassword(value) || "Invalid password format",
                    })}
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />

                  {errors.password && (
                    <p className="text-red-600">{errors.password.message}</p>
                  )}
                  <p
                    className="text-blue-500 underline cursor-pointer"
                    onClick={() => toggleDetails()}
                  >
                    Password guide
                  </p>
                  {showDetails && (
                    <div className="bg-gray-100 p-4 border border-gray-300 mt-2">
                      <p>Include the following in your password:</p>
                      <ul className="list-disc pl-4">
                        <li>At least 8 characters</li>
                        <li>Uppercase and lowercase letters</li>
                        <li>Numbers</li>
                        <li>Special characters</li>
                      </ul>
                    </div>
                  )}
                </div>
                {/* Confirm Password */}
                <div>
                  <div className="flex items-center justify-between mt-2">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Confirm password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="confirmPassword"
                      {...register("confirmPassword", {
                        required: "Confirm password is required",
                        validate: (value, formValues) =>
                          value === formValues.password ||
                          "Password does not match",
                      })}
                      type="password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-600">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member?{" "}
              <Link
                to="/SignIn"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
