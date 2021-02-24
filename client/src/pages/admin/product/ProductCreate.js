import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

// alag alag state lekhne ke bajae humne aik sath likh deya hai or hum at a time aik state ko change kr sakte han
const initialState = {
  title: "Macbook Pro",
  description: "This is the best Apple product",
  url: "",
  price: "45000",
  categories: [],
  category: "",
  subs: [],
  shipping: "Yes",
  quantity: "50",
  images: [
    // {
    //   public_id: "jwrzeubemmypod99e8lz",
    //   url:
    //     "https://res.cloudinary.com/dcqjrwaoi/image/upload/v1599480909/jwrzeubemmypod99e8lz.jpg",
    // },
    // {
    //   public_id: "j7uerlvhog1eic0oyize",
    //   url:
    //     "https://res.cloudinary.com/dcqjrwaoi/image/upload/v1599480912/j7uerlvhog1eic0oyize.jpg",
    // },
    // {
    //   public_id: "ho6wnp7sugyemnmtoogf",
    //   url:
    //     "https://res.cloudinary.com/dcqjrwaoi/image/upload/v1599480913/ho6wnp7sugyemnmtoogf.jpg",
    // },
  ],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "EverGlowOrganics"],
  color: "White",
  brand: "Apple",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  // redux se user ke value le rahai han
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories(); // yeh aik function banaya hai or sare categories load ke hai
  }, []);

  const loadCategories = () =>
    // getCategories aik function hai usko humne call krwaya or database se sari categories leke agaya then or go categories aye woh humne "categories" state me save kr wadi
    getCategories().then((c) => setValues({ ...values, categories: c.data })); // state me sare categories save hogae

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token) // create product ka function call krwaya hai or jitne bhi state me values hai woh hum pass krwa rahai han
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload(); // or ise pora page reload ho raha hai
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  // jitni bhi field hai agr "title" pe click kare ga toh title ke value set hoge state me agr description pe click kare ga toh description ke state change hoge
  const handleChange = (e) => {
    // yeh is tarha update kr raha hun ke (title ----> ti)
    // (title ----> title) (description ----> des) (price ---> 4) (color ---> black)
    // is tarha update kr raha hai
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  const handleCatagoryChange = (e) => {
    // handle category change yeh hai agr bnd category select kare ga toh use "sub" category show hoge wrna nhi hoge
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value); // subs ko empty array is wajha se leya hai agr pehle koi cheese hai subs me woh empty ajae  or agr jo category select kare uska name enrol ho jae "category" me
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      // "getCategorySubs" ka aik function call keya hai jisse sare category ajae ge
      console.log("SUB OPTIONS ON CATGORY CLICK", res);
      setSubOptions(res.data); // yeh me obtion me data dalo ga jo mujhe is "category" ke option se sub mila hai
    });
    setShowSub(true);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Product create</h4>
          )}
          <hr />

          {/* {JSON.stringify(values.images)} */}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCatagoryChange={handleCatagoryChange}
            subOptions={subOptions}
            showSub={showSub}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
