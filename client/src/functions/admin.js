import axios from "axios";

export const getOrders = async (authtoken, countPagination) =>
  await axios.get(
    `${process.env.REACT_APP_API}/admin/orders/${countPagination}`,
    {
      headers: {
        authtoken,
      },
    }
  );

export const getOrdersStatus = async (authtoken, Status, countPagination) =>
  await axios.get(
    `${process.env.REACT_APP_API}/admin/orderStatus/${Status}/${countPagination}`,
    {
      headers: {
        authtoken,
      },
    }
  );

export const changeStatus = async (orderId, orderStatus, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getOrderCount = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/admin/orderCount`, {
    headers: {
      authtoken,
    },
  });
