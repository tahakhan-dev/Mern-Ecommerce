import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state })); // sb se pehle humne yeh keya ke jo value this redux store me user ke woh humne get krle
  // and then checking user or token hai agr hai toh render krde wrna redirect krde or "LoadingToRedirect" aik component banaya hai woh call krdo

  return user && user.token ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default UserRoute;
