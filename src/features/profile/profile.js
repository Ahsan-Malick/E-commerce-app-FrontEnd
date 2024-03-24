import React, { useState, useContext, createContext } from "react";
import NavBar from "../product/NavBar";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../auth/AuthSlice";
import EditProfileFormA from "../auth/components/EditProfileFormA";
import EditProfileFormB from "../auth/components/EditProfileFormB";

export const Context = React.createContext();

export default function ProfilePage() {
  const userInfo = useSelector(selectUserInfo);
  const [toggleFormA, setToggleFormA] = useState(false);
  const [toggleFormB, setToggleFormB] = useState(false);
  console.log("FormB", toggleFormB);
  console.log("FormA", toggleFormA);

  return (
    <>
      <NavBar></NavBar>
      <div className="bg-gray-100 mx-10 mb-10">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            {/* User Detail */}
            <div className="col-span-4 sm:col-span-4">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <img
                    src="https://www.shutterstock.com/image-vector/vector-design-avatar-dummy-sign-600nw-1290556063.jpg"
                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                    alt="commin soon"
                  ></img>
                  <h1 className="text-xl font-bold">
                    {userInfo.firstname + " " + userInfo.lastname}
                  </h1>
                  <p className="text-gray-700">{userInfo.email}</p>
                  <div className="mt-6 flex flex-wrap gap-4 justify-center">
                    <Context.Provider
                      value={[
                        toggleFormA,
                        setToggleFormA,
                        toggleFormB,
                        setToggleFormB,
                      ]}
                    >
                      {toggleFormA ? (
                        <EditProfileFormA></EditProfileFormA>
                      ) : toggleFormB ? (
                        <EditProfileFormB></EditProfileFormB>
                      )  : (
                        <>
                          <EditProfileFormA></EditProfileFormA>
                          <EditProfileFormB></EditProfileFormB>
                        </>
                      )}
                    </Context.Provider>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="col-span-4 sm:col-span-4 ">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <img
                    src="https://www.shutterstock.com/image-vector/vector-design-avatar-dummy-sign-600nw-1290556063.jpg"
                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                    alt="commin soon"
                  ></img>
                  <h1 className="text-xl font-bold">
                    {userInfo.firstname + " " + userInfo.lastname}
                  </h1>
                  <p className="text-gray-700">{userInfo.email}</p>
                  <div className="mt-6 flex flex-wrap gap-4 justify-center">
                    {/* <EditProfileFormA></EditProfileFormA>
                    <EditProfileFormB></EditProfileFormB> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="col-span-4 sm:col-span-4 ">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <img
                    src="https://www.shutterstock.com/image-vector/vector-design-avatar-dummy-sign-600nw-1290556063.jpg"
                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                    alt="commin soon"
                  ></img>
                  <h1 className="text-xl font-bold">
                    {userInfo.firstname + " " + userInfo.lastname}
                  </h1>
                  <p className="text-gray-700">{userInfo.email}</p>
                  <div className="mt-6 flex flex-wrap gap-4 justify-center">
                    {/* <EditProfileFormA></EditProfileFormA>
                    <EditProfileFormB></EditProfileFormB> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
