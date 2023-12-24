import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteaddressAsync, selectAddresses } from "./stacklistSlice";

// const address = [
//     {
//         name: 'Leslie Alexander',
//         street: '12 losinga road',
//         postcode: 'IG11 4XD',
//         phone: '07499999'

//     },
//     {
//         name: 'Jack Lee',
//         street: '25 baker lane',
//         postcode: 'PE33 4XD',
//         phone: '07499555'

//     },

// ]

function Stacklist() {
  const address = useSelector(selectAddresses);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteaddressAsync(id));
    console.log(id)
  };
  return (
    <fieldset>
      {address.map((address) => (
        <div className="flex items-start justify-between">
          <div className="text-start p-3 flex gap-5 items-start">
            <input
              id={address.name}
              name="address"
              type="radio"
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 "
            />
            <span>
              <p className="text-sm font-semibold leading-6 text-gray-900">{`${address.firstname} ${address.lastname}`}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {address.street}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {address.city}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {address.postcode}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {address.country}
              </p>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button className="text-red-600 hover:text-red-800 focus:outline-none" onClick={()=>handleDelete(address.id)}>
              Remove
            </button>
            {/* <button className="text-indigo-600 hover:text-indigo-800 focus:outline-none">
              Update
            </button> */}
          </div>
        </div>
      ))}
    </fieldset>
  );
}

export default Stacklist;
