const Product = require("../models/product");

exports.addProduct = async (req, res, next) => {
    const {name, price, description, category, quantity, company, imageurl} = req.body;
    console.log(req.body);

    const newProduct = new Product({Name: name, Price: price, Description: description, Category: category, Quantity: quantity, Company: company, ImageUrl: imageurl});
    newProduct.save().then(
        data => {
            if(!data) res.status(400).json({Error: "Could not save this note"});
            else res.json({sucess: "Saved Succussfully"});
        }
    )
    .catch(error => {
        res.status(400).json({error: "Internal Server Error"});
    })

}

exports.fetchProductbyCategory = async (req, res) => {
    const {category} = req.body;

    Product.find({Category: category}, (err, user) => {
        if(err) res.status(404).json({error: "Error in finding notes"});
        res.send(user);
    })
}

exports.fetchProductbyId = async (req, res) => {
    const {_id} = req.body;

    Product.findOne({_id: _id}, (err, user) => {
        if(err) res.status(404).json({error: "Error in finding notes"});
        res.send(user);
    })
}