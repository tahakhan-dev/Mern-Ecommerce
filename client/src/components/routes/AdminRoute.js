import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../functions/auth";

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state })); // yeh apka user ke value utha raha hai redux store se
  const [ok, setOk] = useState(false);

  // useEffect is wajha se use keya hai ke jb bhi user change ho toh yeh use effect run ho
  useEffect(() => {
    if (user && user.token) {
      // checking ke jo user hai uska pass token hai ya nhi agr hai toh check karo use
      currentAdmin(user.token) // current admin aik function hai "axios" ke through req backend pe send krwae hai or header ke through token send keya hai ke check karo ise
        .then((res) => {
          console.log("CURRENT ADMIN RES", res);
          setOk(true);
        })
        .catch((err) => {
          console.log("ADMIN ROUTE ERR", err);
          setOk(false);
        });
    }
  }, [user]);

  // agr okay hai toh sare props send krdo wrna redirect krdo
  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
