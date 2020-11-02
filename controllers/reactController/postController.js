const Product = require('../../models/productModel');
const api = require('../../api/api');


async function fnMixinUpload(files,req) {
    // save file to cloud and name to mongodb
    if (files.photoCover) {
        // save name to db
        // save to cloud
        let photo = await api.UploadFile(files.photoCover[0].path,'blog');
        req.body.photoCover = photo;
    }
    if (files.photoContent_1) {
        photo = await api.UploadFile(req.files.photoContent_1[0].path,'blog');
        req.body.photoContent_1 = photo;
    }
    if (files.photoContent_2) {
        photo = await api.UploadFile(files.photoContent_2[0].path,'blog');
        req.body.photoContent_2 = photo;
    }
    if (files.photoContent_3) {
        photo = await api.UploadFile(files.photoContent_3[0].path,'blog');
        req.body.photoContent_3 = photo;
    }
    if (files.photoContent_4) {
        photo = await api.UploadFile(files.photoContent_4[0].path,'blog');
        req.body.photoContent_4 = photo;
    }
    if (files.photoContent_5) {
        photo = await api.UploadFile(files.photoContent_5[0].path,'blog');
        req.body.photoContent_5 = photo;
    }
    if (files.photoContent_6) {
        photo = await api.UploadFile(files.photoContent_6[0].path,'blog');
        req.body.photoContent_6 = photo;
    }
    if (files.photoContent_7) {
        photo = await api.UploadFile(files.photoContent_7[0].path,'blog');
        req.body.photoContent_7 = photo;
    }
}
exports.getPostHome = async (req, res, next) => {
    const perPage = 6;
    const page = req.params.page || 1;
    // for search
    const title = req.query.title;
    // options i khong phan biet chu hoa /thuong tim het
    var condition = title ? {product_name: {$regex: new RegExp(title),$options: "i"}}: {};
    try {
        await Product.find(condition)
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec(function (err, products) {
                Product.count().exec(function (err, count) {
                    if (err) return next(err);
                    res.status(200).json({
                        title: 'Home',
                        products: products,
                        current: page,
                        pages: Math.ceil(count / perPage),
                        user: req.user
                    });
                });
            });
    } catch (err) {
        res.status(400).send('Cannot execute query in get all post!');
    }
}
exports.getUpdatePost =  (req, res, next) => {
    Product.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.status(200).json({
                status: 'success',
                data: doc
            })
        }
    });
}
exports.addUpdatePost = async function (req, res, next) {
    try {
        console.log('Request body : ',req.body);
        console.log('Request file : ',req.file);
        console.log('Request files : ',req.files);
        if (!req.body._id) {
            // (Add) INSERT INTO MONGODB
          if(api.isEmptyObject(req.files) !== 0){
              await fnMixinUpload(req.files,req);
          }
            const post = await Product.create(req.body);
            res.status(201).json({
                status: 'success',
                message: 'Create successfully!',
                data: {
                    data: post
                }
            });
        } else {
            // UPDATE INTO MONGODB
            if(api.isEmptyObject(req.files) !== 0){
                await fnMixinUpload(req.files,req);
            }
            await Product.findOneAndUpdate({ _id: req.body._id }, req.body, { useFindAndModify: false, new: true }, (err, doc) => {
                if (!err) {
                    res.status(200).json({
                        status: 'success',
                        message: 'Update successfully!'
                    })
                    // res.redirect('/');
                }
                else {
                    // neu update khong duoc
                    if (err.name == 'ValidationError') {
                        // co the them xu ly validation error o day nghien cuu 
                        // hien thi lai data da edit nhung chua thanh cong
                        res.status(400).send('Cannot Update Post - by validationErr!' + err)
                    } else {
                        console.log('Error during updating the record! ' + err);
                        res.status(400).send('Cannot Update Post!' + err)
                    }
                }
            });
        }

    } catch (err) {
        console.log(err);
        res.status(400).send('Cannot add or update product');
    }
}
exports.search = async(req,res,next) => {
    try{
       const posts = await Product.find( { "product_name": `${req.body}` } )
        res.status(200).json({
            data: posts
        });
    }catch(err){
        res.status(400).send('Cannot execute query in search!');
    }

}

// exports.getPost = async (req, res, next) => {
   // db.stores.find( { $text: { $search: "java coffee shop" } } )
//     try {
//         const post = await Product.findOne({ product_slug: req.params.slug });
//         console.log(post);
//         if (!post) {
//             res.status(404).send('Not found post detail with name!');
//         }
//         res.status(200).render('detail.pug', {
//             title: `${post.product_name}`,
//             post
//         });
//     } catch (err) {
//         res.status(400).send('Cannot execute query in detail!');
//     }
// }