import { useDispatch, useSelector } from "react-redux";
import { LoggedOut, selectLoggedUsers } from "../features/auth/AuthSlice";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedUsers);

  useEffect(() => {
    dispatch(LoggedOut(null));
  }, []);

  //component first render without useEffect thats why we put check !user in return
  return (
    <>
      {!user&&<Navigate to='SignIn' ></Navigate>}
    </>
  );
}
