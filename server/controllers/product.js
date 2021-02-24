const Product = require("../models/product");
const User = require("../models/user");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title); // slug fronted se nhi araha humne yeh keya hai ke jo title hai usko slug banaya or "req.body" me save krwa deya
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    // res.status(400).send("Create product failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listAll = async (req, res) => {
  let NUMBER_OF_ITEMS = 60;

  let products = await Product.find({})
    .skip(NUMBER_OF_ITEMS * (parseInt(req.params.count) - 1))
    .limit(NUMBER_OF_ITEMS)
    // .limit(parseInt(req.params.count))
    .populate("category") // hum populate is wajha se use krte han take hume sari information mil jae api hit krke check krsakte ho
    .populate("subs") // agr hum populate use na kare toh srf id mile ge object ke jo database me store hai agr hum populate lagae ge toh id ke sath value bhi milege "or populate ke leye ref" zarori hai
    .sort([["createdAt", "desc"]])
    .exec();

  res.json(products);
};

exports.listAllPagination = async (req, res) => {
  let NUMBER_OF_ITEMS = 24;

  let products = await Product.find({})
    .skip(NUMBER_OF_ITEMS * (parseInt(req.params.countPagination) - 1))
    .limit(NUMBER_OF_ITEMS)
    // .limit(parseInt(req.params.count))
    .populate("category") // hum populate is wajha se use krte han take hume sari information mil jae api hit krke check krsakte ho
    .populate("subs") // agr hum populate use na kare toh srf id mile ge object ke jo database me store hai agr hum populate lagae ge toh id ke sath value bhi milege "or populate ke leye ref" zarori hai
    .sort([["createdAt", "desc"]])
    .exec();

  res.json(products);
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.staus(400).send("Product delete failed");
  }
};

exports.read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subs")
    .exec();
  res.json(product);
};

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("PRODUCT UPDATE ERROR ----> ", err);
    // return res.status(400).send("Product update failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

//WITHOUT PAGINATION
exports.list = async (req, res) => {
  try {
    // createdAt/updatedAt, desc/asc, 3
    const { sort, order } = req.body;
    const products = await Product.find({})
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .limit(20)
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

// WITH PAGINATION
// exports.list = async (req, res) => {
//   // console.table(req.body);
//   try {
//     // createdAt/updatedAt, desc/asc, 3
//     const { sort, order, page } = req.body;
//     const currentPage = page || 1; // agr koi current page nhi hoga toh random 1 lele ga
//     const perPage = 3; // 3

//     const products = await Product.find({})
//       .skip((currentPage - 1) * perPage) // for example agr 1 "currentPage" hoga - 1 0 * 0 =0 mtlb skip karo 0 toh yeh first page hoga
//       .populate("category")
//       .populate("subs")
//       .sort([[sort, order]])
//       .limit(perPage)
//       .exec();

//     res.json(products);
//   } catch (err) {
//     console.log(err);
//   }
// };

exports.productsCount = async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

exports.productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();
  const { star, review } = req.body;

  console.log(star + "---Star Rating");
  console.log(typeof review + "---review Rating");

  // who is updating?
  // check if currently logged in user have already added rating to this product?
  let existingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );

  console.log(existingRatingObject);

  // if user haven't left rating yet, push it
  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: {
          ratings: { star, postedBy: user._id },
          reviews: { review, postedBy: user._id },
        },
      },
      { new: true }
    ).exec();
    console.log("ratingAdded", ratingAdded);
    res.json(ratingAdded);
  } else {
    // if user have already left rating, update it
    // const ratingUpdated = await Product.updateOne(
    //   {
    //     ratings: { $elemMatch: existingRatingObject },
    //   },
    //   { $set: { "ratings.$.star": star } },
    //   { new: true }
    // ).exec();
    // console.log("ratingUpdated", ratingUpdated);
    // res.json(ratingUpdated);
  }
};

exports.listRelated = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();

  // const related = Product.aggregate(
  //   [
  //     { $match: { _id: { $ne: product._id }, category: product.category } },
  //     { $sample: { size:  } },
  //   ],
  //   function (err, docs) {
  //     console.log(docs);
  //   }
  // );

  const count = await await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  }).count();

  var random = Math.floor(Math.random() * count);

  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(4)
    .skip(random)
    .populate("category")
    .populate("subs")
    .populate("postedBy")
    .exec();
  res.json(related);
};

// SERACH / FILTER

const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

const handlePrice = async (req, res, price) => {
  try {
    let products = await Product.find({
      price: {
        $gte: price[0], // req body se jo price arahe hoge woh array me arahai hoge toh pehle value hamesha greater than hoge dosre value less than hoge
        $lte: price[1],
      },
    })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("postedBy", "_id name")
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

const handleCategory = async (req, res, category) => {
  try {
    let products = await Product.find({ category })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("postedBy", "_id name")
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

const handleStar = (req, res, stars) => {
  Product.aggregate([
    {
      $project: {
        document: "$$ROOT", // yeh apki pori file ko access deta hai
        // title: "$title",
        floorAverage: {
          // hum jb return kr rahai han toh aik new field ke sath value return kr rahai han
          $floor: { $avg: "$ratings.star" }, // floor value of 3.33 will be 3
        },
      },
    },
    { $match: { floorAverage: stars } }, // or yeh sari fields ko match kr raha mtlb agr "User" ne 4 pe click keya hai toh or jitne bhi product ke "floor" 4 bani hoge toh use return krde
  ])
    .limit(12)
    .exec((err, aggregates) => {
      if (err) console.log("AGGREGATE ERROR", err);
      Product.find({ _id: aggregates }) // woh product find kare mtlb aggregae me jo product hoge agr uski id product ke id se match kare toh woh return krdo
        .populate("category", "_id name")
        .populate("subs", "_id name")
        .populate("postedBy", "_id name")
        .exec((err, products) => {
          if (err) console.log("PRODUCT AGGREGATE ERROR", err);
          res.json(products);
        });
    });
};

const handleSub = async (req, res, sub) => {
  const products = await Product.find({ subs: sub })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

const handleShipping = async (req, res, shipping) => {
  const products = await Product.find({ shipping })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

const handleColor = async (req, res, color) => {
  const products = await Product.find({ color })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

const handleBrand = async (req, res, brand) => {
  const products = await Product.find({ brand })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

exports.searchFilters = async (req, res) => {
  // in sb me se hamesha koi aik he value aye ge asa nhi ho sakta ke query ke bhi aye price ke bhi aye at a time aik he aye ge
  const {
    query,
    price,
    category,
    stars,
    sub,
    shipping,
    color,
    brand,
  } = req.body;

  if (query) {
    console.log("query --->", query);
    await handleQuery(req, res, query);
  }

  // price [20, 200]
  if (price !== undefined) {
    // agr price undefine hoge toh nhi chale ga
    console.log("price ---> ", price);
    await handlePrice(req, res, price);
  }

  if (category) {
    console.log("category ---> ", category);
    await handleCategory(req, res, category);
  }

  if (stars) {
    console.log("stars ---> ", stars);
    await handleStar(req, res, stars);
  }

  if (sub) {
    console.log("sub ---> ", sub);
    await handleSub(req, res, sub);
  }

  if (shipping) {
    console.log("shipping ---> ", shipping);
    await handleShipping(req, res, shipping);
  }

  if (color) {
    console.log("color ---> ", color);
    await handleColor(req, res, color);
  }

  if (brand) {
    console.log("brand ---> ", brand);
    await handleBrand(req, res, brand);
  }
};

exports.productReview = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }).exec();
  res.json({ review: product.reviews, ratings: product.ratings });
};

exports.everGlowProduct = async (req, res) => {
  let seen = new Set();
  let glowCategory = [];
  const { sort, order } = req.body;

  const product = await Product.find({ brand: "EverGlowOrganics" })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  const filterProduct = await Product.find({ brand: "EverGlowOrganics" })
    .populate("category", "_id name slug")
    .populate("subs")
    .sort([[sort, order]])
    .limit(10)
    .exec();

  let filteredArr = filterProduct.filter((el) => {
    let duplicate = seen.has(el.category.name);
    seen.add(el.category.name);
    return !duplicate;
  });

  filteredArr.forEach((res) => {
    glowCategory.push(res.category.name);
  });

  console.log(glowCategory);
  res.json({ product, filterProduct, glowCategory });
};
