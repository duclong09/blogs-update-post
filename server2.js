const express = require("express");
const app = express();
const router = express.Router();

const path = require("path");
const multer = require("multer");
//để có thể nhận được dữ liệu tu req.body.
app.use(express.json());
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("myImage");

app.post("/upload",function (req, res, next) {
  console.log("Request body ---1", req.body);
  console.log("Request file ---", req.file); //Here you get file.

 return res.status(200).json({
    message: 'thanh cong'
  })
});

app.get('/',(req,res,next)=> {
   res.status(200).json({
      hoa:'hoa'
   });
})
const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log("App listening on port " + port);
});
