import axios from "axios";

export const userCart = async (cart, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserCart = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authtoken,
    },
  });

export const emptyUserCart = async (authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authtoken,
    },
  });

export const saveUserAddress = async (authtoken, address) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
    {
      headers: {
        authtoken,
      },
    }
  );

export const saveUserName = async (authtoken, name) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/name`,
    { name },
    {
      headers: {
        authtoken,
      },
    }
  );

export const saveUserContactName = async (authtoken, contactNumber) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/contactNumber`,
    { contactNumber },
    {
      headers: {
        authtoken,
      },
    }
  );

export const saveUserLocation = async (authtoken, Userlocation) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/userLocation`,
    { Userlocation },
    {
      headers: {
        authtoken,
      },
    }
  );

export const saveUserEmail = async (authtoken, saveUserEmail) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/userEmail`,
    { saveUserEmail },
    {
      headers: {
        authtoken,
      },
    }
  );

// export const findUser = async (email, authtoken) =>
//   await axios.get(
//     `${process.env.REACT_APP_API}/user/wishlist/${email}`,
//     {},
//     {
//       headers: {
//         authtoken,
//       },
//     }
//   );

export const applyCoupon = async (authtoken, coupon) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );

export const createOrder = async (stripeResponse, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/order`,
    { stripeResponse },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserOrders = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
    headers: {
      authtoken,
    },
  });

export const getWishlist = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/wishlist`, {
    headers: {
      authtoken,
    },
  });

export const removeWishlist = async (productId, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/user/wishlist/${productId}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

export const addToWishlist = async (productId, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/wishlist`,
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );

export const createCashOrderForUser = async (
  authtoken,
  COD,
  couponTrueOrFalse,
  name,
  address,
  contact,
  locationUser,
  CurrentUserEmail
) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cash-order`,
    {
      couponApplied: couponTrueOrFalse,
      COD,
      name,
      address,
      contact,
      locationUser,
      CurrentUserEmail,
    },
    {
      headers: {
        authtoken,
      },
    }
  );
