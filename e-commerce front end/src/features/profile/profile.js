import { useSelector } from "react-redux";
import { selectUserInfo } from "../auth/AuthSlice";
import { useEffect } from "react";

export default function UserProfile() {
  const user = useSelector(selectUserInfo);
  const check = true;
  const userDetail = [
    {
      ...user,
      thumbnail: "https://robohash.org/doloremquesintcorrupti.png",
    },
  ];

  return (
    <>
     {check && (
        <div className="mx-auto mt-10 max-w-7xl px-12 sm:px-6 lg:px-12">
          <h2 className="text-3xl text-start font-semibold">User Profile</h2>
          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {userDetail.map((detail) => (
                  <li key={detail.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={detail.thumbnail}
                        alt={detail.id}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col mb-4">
                      <div>
                        <div className="flex flex-col justify-between text-base font-semibold text-gray-900">
                          <h3>
                            <div>{detail.email}</div>
                          </h3>
                          <p className="font-semibold ml-4">ID: {detail.id}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">empty 2</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">Qty</div>

                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
