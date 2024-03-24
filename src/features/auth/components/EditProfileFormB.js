import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createUserAsync } from "../AuthSlice";
import { selectLoggedUsers } from "../AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../product/NavBar";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { Context } from "../../profile/profile";

export default function EditProfileFormB() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    console.log(data);
  };

  const [showDetails, setShowDetails] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [visibleCurrentPassword, setVisibleCurrentPassword] = useState(false);
  const [visibleNewPassword, setVisibleNewPassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
  const [toggleFormA, setToggleFormA, toggleFormB, setToggleFormB] =
    useContext(Context);

  const toggleFormHandler = () => {
    setToggleFormB(!toggleFormB);
  };

  function toggleDetails() {
    setShowDetails(!showDetails);
  }

  const togglePassword = () => {
    setShowPassword(!showPassword);
  }; // NEED TO REMOVE IF NOT USED, IN FUTURE

  const toggleCurrentPasswordVisibility = () => {
    setVisibleCurrentPassword(!visibleCurrentPassword);
  };
  const toggleNewPasswordVisibility = () => {
    setVisibleNewPassword(!visibleNewPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setVisibleConfirmPassword(!visibleConfirmPassword);
  };

  const validatePassword = (value) => {
    // Add your custom password validation logic here
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
    return passwordRegex.test(value);
  };

  return (
    <div>
      {toggleFormB ? (
        <form noValidate className="" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="flex flex-col space-y-5">
              {/* Current Password */}
              <div>
                <div className="flex items-center justify-between mt-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Current Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="currentPassword"
                    {...register("currentPassword", {
                      required: "current password is required",
                      validate: (value, formValues) =>
                        value === formValues.password || "Incorrect Password",
                    })}
                    type={visibleCurrentPassword ? "text" : "password"}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />

                  <div
                    onClick={toggleCurrentPasswordVisibility}
                    className="relative inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  >
                    {visibleCurrentPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-600">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
              {/* New Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    New Password
                  </label>
                </div>
                <div className="mt-2 text-start">
                  <input
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                      validate: (value) =>
                        validatePassword(value) || "Invalid password format",
                    })}
                    type={visibleNewPassword ? "text" : "password"}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <div
                    onClick={toggleNewPasswordVisibility}
                    className="relative inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  >
                    {visibleNewPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </div>

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
              </div>
              {/* Confirm New Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm New Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="confirmNewPassword"
                    {...register("confirmNewPassword", {
                      required: "Confirm New password is required",
                      validate: (value, formValues) =>
                        value === formValues.password ||
                        "Password does not match",
                    })}
                    type={visibleConfirmPassword ? "text" : "password"}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <div
                    onClick={toggleConfirmPasswordVisibility}
                    className="relative inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  >
                    {visibleConfirmPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-600">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex space-x-2 mt-2">
              <button
                className="flex justify-center rounded-md px-1 text-white py-1.5 text-sm font-semibold transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
                onClick={togglePassword}
              >
                Save Changes
              </button>
              <button
                className="flex w-1/6 justify-center rounded-md px-1 text-white py-1.5 text-sm font-semibold transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
                type="button"
                onClick={() => {
                  toggleFormHandler();
                }}
              >
                &#x21A9;
              </button>
            </div>
          </div>
        </form>
      ) : (
        <button
          className="flex justify-center rounded-md px-1 text-white py-1.5 text-sm font-semibold transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
          onClick={() => {
            togglePassword();
            toggleFormHandler();
          }}
        >
          Change Password
        </button>
      )}
    </div>
  );
}
