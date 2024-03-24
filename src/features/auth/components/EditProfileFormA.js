import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import { createUserAsync } from "../AuthSlice";
import { selectLoggedUsers } from "../AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../product/NavBar";
import { Context } from "../../profile/profile";

export default function EditProfileFormA() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const [showUsername, setShowUsername] = useState(false);
  const [toggleFormA, setToggleFormA] = useContext(Context);

  const toggleFormHandler = () => {
    setToggleFormA(!toggleFormA);
  };

  const toggleUsername = () => {
    setShowUsername(!showUsername);
  };

  const onSubmit = (data) => {
    console.log(data);
    setShowUsername(!showUsername);
  };

  return (
    <div>
      {showUsername ? (
        <form noValidate className="" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <div className="mt-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                >
                  Enter New Username
                </label>
                <input
                  id="username"
                  {...register("username", {
                    required: "Invalid Email",
                  })}
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.username && (
                  <p className="text-red-600"> {errors.username.message}</p>
                )}
              </div>
              <div className="flex space-x-2 mt-2">
                <button
                  className="flex justify-center rounded-md px-1 text-white py-1.5 text-sm font-semibold transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
                  type="submit"
                >
                  Save Changes
                </button>
                <button
                  className="flex w-1/6 justify-center rounded-md px-1 text-white py-1.5 text-sm font-semibold transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
                  type="button"
                  onClick={() => {
                    toggleUsername();
                    toggleFormHandler();
                  }}
                >
                  &#x21A9;
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <button
          className="flex justify-center rounded-md px-1 text-white py-1.5 text-sm font-semibold transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 mb-2"
          type="button"
          onClick={() => {
            toggleUsername();
            toggleFormHandler();
          }}
        >
          Change Username
        </button>
      )}
    </div>
  );
}
