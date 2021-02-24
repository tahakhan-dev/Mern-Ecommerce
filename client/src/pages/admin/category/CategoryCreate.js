import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state })); // this useSelector is use in a way that it first spread the state and then get the use value it desturcture it

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]); // humne array me is wajha se leya hai q ke srf aik variable nhi hoga bht sare hoge
  // step 1
  const [keyword, setKeyword] = useState(""); //sb se pehle humne banaya state for filtering category

  useEffect(() => {
    loadCategories(); // yeh her wqt chale ga jb bhi page render hoga
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data)); // yeh load kr raha hai sare categories

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true); // jb submit ho toh loading shuru ho jae
    createCategory({ name }, user.token) // createCategory kr rahai han "name","token" send kr rahai ke authenticate kr sake or new category update kr sake
      .then((res) => {
        // console.log(res)
        setLoading(false); // result aye toh loading rokde
        setName(""); // or input value hai woh empty krde mtlb state khali krde
        toast.success(`"${res.data.name}" is created`);
        loadCategories(); // or category load krde
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm("Delete?")) {
      // sb se pehle window se woh option uthae delete wala
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  // step 4
  // includes yeh hota hai ke agr user ne type keya "a" check kare ga "a" name ka koi hai ya ise milta julta agr hoga toh value true dega agr nhi hoga toh false dega
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Create category</h4>
          )}

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />

          {/* step 2 and step 3 */}
          {/* step 2  for searching input field bnae hai searching ke leye*/}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {/* Map krne ke leye zarori hai uski key or name */}
          {/* categories state hai or array hai isme jitne bhi category hai use map krdo as a "div" */}

          {/* step 5 */}
          {categories.filter(searched(keyword)).map((c) => (
            <div className="alert alert-secondary" key={c._id}>
              {c.name}

              {/* agr category ke remove pe click karo toh "handleRemove" chale ga use me bass hoga "slug" */}
              <span
                onClick={() => handleRemove(c.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>

              {/* Edit ke icon pe click kare ge toh apko redirect krde ga /admin/category/sulg */}
              <Link to={`/admin/category/${c.slug}`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-warning" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
