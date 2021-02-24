import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {
  getOrdersStatus,
  changeStatus,
  getOrderCount,
} from "../../../functions/admin";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../../components/order/Orders";
import { Pagination } from "antd";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    let isMounted = true;
    getOrdersStatus(user.token, "NotProcessed", page).then((response) => {
      if (!isMounted) return;

      console.log(JSON.stringify(response.data, null, 4));
      setOrders(response.data);
    });

    return () => (isMounted = false);
  }, [page]);

  useEffect(() => {
    getOrderCount(user.token).then((res) => setProductsCount(res.data)); // jitna bhi product hoga uska count ajae ga  for example 20 ya 30 istarha
  }, []);

  const loadOrders = () =>
    getOrdersStatus(user.token, "NotProcessed", page).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status updated");
      loadOrders();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>Admin Dashboard</h4>
          {/* {JSON.stringify(orders)} */}
          <Orders orders={orders} handleStatusChange={handleStatusChange} />
        </div>
      </div>
      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={(productsCount / 4) * 3}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </div>
  );
};

export default AdminDashboard;
