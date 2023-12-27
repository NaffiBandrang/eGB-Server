// Dependencies and Modules
const Product = require("../models/Product");

// Create New Product Controller
module.exports.addProduct = (req, res) => {

    let newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });

    return newProduct.save().then((product, error) => {
        if(error){
            return res.send(false);
        } else {
            return res.send(true);
        }
    }).catch(error => res.send(error));
}

// Retrieve All Product Controller
module.exports.getAllProducts = (req, res) => {

    return Product.find({}).then(result => {
        return res.send(result);
    });
}

// Retrieve All Active Products Controller
module.exports.getAllActiveProducts = (req, res) => {

    return Product.find({isActive: true}).then(result => {
        return res.send(result);
    });
}

// Retrieve Single Product Controller
module.exports.getProduct = (req, res) => {

    return Product.findById(req.params.productId).then(result => {
        return res.send(result);
    });
}

// Update Product Information Controller
module.exports.updateProduct = (req, res) => {

    let updatedProduct = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    }

    return Product.findByIdAndUpdate(req.params.productId, updatedProduct).then((product, error) => {
        if(error){
            return res.send(false);
        } else{
            return res.send(true);
        }
    });
}

// Archive Product Controller
module.exports.archiveProduct = (req, res) => {

    let updatedActiveField = {
        isActive: false
    }

    return Product.findByIdAndUpdate(req.params.productId, updatedActiveField).then((product, error) => {
        if(error){
            return res.send(false);
        } else {
            return res.send(true);
        }
    })
}

// Activate Product Controller
module.exports.activateProduct = (req, res) => {

    let updatedActiveField = {
        isActive: true
    }

    return Product.findByIdAndUpdate(req.params.productId, updatedActiveField).then((product, error) => {
        if(error){
            return res.send(false);
        } else {
            return res.send(true);
        }
    })
}

// Search Product by Product name
module.exports.searchProductsByName = async (req, res) => {
    try {
      const { productName } = req.body;
  
      // Use a regular expression to perform a case-insensitive search
      const products = await Product.find({
        name: { $regex: productName, $options: 'i' }
      });
  
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };