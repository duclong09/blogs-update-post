const api = require("../../api/api");
const Product = require("../../models/productModel");
const Comment = require("../../models/reactModel/commentModel");

exports.getComment = async (req, res, next) => {
  try {
    // const data = await Comment.find({});
    // Pass the name of the field to populate, not the name of the model:
    const data = await Product.findById(req.params.id).populate({
      path: "comments",
      model: Comment,
    });
    console.log(data);
    if (!data) {
      res.status(200).json({
        status: "error",
        data: "khong ton tai comment nao!",
      });
    }
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("cannot execute getComment!" + err);
  }

  //    const getTutorialWithPopulate = function(id) {
  //     return db.Tutorial.findById(id).populate("comments");
  //   };
};
exports.createComment = (req, res, next) => {
  try {
    console.log("body comment: ", req.body);
    let ob = {};
    // chi cho phep tao cac truong hop le
    Object.keys(req.body).forEach((el) => {
      if (["commentUser", "commentContent", "productId"].includes(el)) {
        ob[el] = req.body[el];
      }
    });
    if (Object.keys(ob).length === 1) {
      return res.status(404).send("Du lieu nhap khong dung!");
    }
    const comment = Comment.create(ob).then((docComment) => {
      console.log("\n>> Created Comment:\n", docComment);
      return Product.findByIdAndUpdate(
        ob.productId,
        { $push: { comments: docComment._id } },
        // mac dinh
        { new: true, useFindAndModify: false }
      );
    });
    res.status(201).json({
      status: "success",
      data: comment,
    });
  } catch (err) {
    res.status(400).send("cannot execute create comment!");
  }
  // const createComment = function(tutorialId, comment) {
  //     return db.Comment.create(comment).then(docComment => {
  //       console.log("\n>> Created Comment:\n", docComment);

  //       return db.Tutorial.findByIdAndUpdate(
  //         tutorialId,
  //         { $push: { comments: docComment._id } },
  //         { new: true, useFindAndModify: false }
  //       );
  //     });
  //   };
};
exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      res.status(404).send("Not found post with ID to delete!");
    }
    res.status(200).json({
      status: "success",
      message: "Xóa Thành Công!",
    });
  } catch (err) {
    res.status(400).send("Cannot add delete product");
  }
};
