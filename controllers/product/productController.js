const {Product} = require('../../models');
const ErrorHandler = require('../../services/ErrorHandler');

// to fetch all the products
exports.getProducts = async (req, res, next) => {
    try{
        const products = await Product.find();
        if(products.length === 0)
            return next(ErrorHandler.notFound());
        res.status(200).json(products);
    }
    catch(err){
        return next(err);
    }
};

// to add a new product
exports.addProduct = async (req, res, next) => {
    try{
        const name = req.body.name;
        const description = req.body.discription;
        const imgUrl = req.body.imgUrl;
        const price = req.body.price;
        const isVeg = req.body.isVeg;
        const product = new Product({
            name: name,
            description: description,
            imgUrl: imgUrl,
            price: price,
            isVeg: isVeg
        });
        await product.save();

        res.status(201).json({product: product, status: "success", msg: "Product Created"});
    } 
    catch(err){
        return next(err);
    }
};

// to fetch a single product
exports.viewProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.productId);
        if(product === null)
            return next(ErrorHandler.notFound());
        res.status(200).json(product);
    }
    catch(err){
        return next(err);
    }
};

// to update a product
exports.updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.productId, {
           $set: req.body 
        }, { new: true });
        res.status(200).json({status: "success", msg: "Product Updated"});
    }
    catch(err){
        return next(err);
    }
};

// to delete a product
exports.removeProduct = async (req, res, next) => {
    try {
        const response = await Product.findByIdAndRemove(req.params.productId);
        res.status(200).json({status: "success", msg: "Product Removed"});
    }
    catch(err){
        return next(err);
    }
};
