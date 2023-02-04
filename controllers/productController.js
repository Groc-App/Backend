const Category = require("../models/category");
const Product = require("../models/product");

exports.addProduct = async (req, res) => {
    try {
        // const {name, price, category, description, quantity, company, imageurl} = req.body;
        // console.log(req.body);

        // const categ = await Category.findOne({Name: category});
        // if(!categ)
        // {
        //     const newcateg = new Category({Name: category});

        //     const newProduct = new Product({Name: name, Price: price, Description: description, Quantity: quantity, Company: company, ImageUrl: imageurl});
        
        //     newProduct.Category = newcateg;
        //     await newProduct.save();

        //     newcateg.Products = newProduct._id;
        //     await newcateg.save();
        // }
        // else
        // {
        //     const newProduct = new Product({Name: name, Price: price, Description: description, Quantity: quantity, Company: company, ImageUrl: imageurl});

        //     newProduct.Category = categ;
        //     await newProduct.save();

        //     categ.Products.push(newProduct._id);
        //     await newcateg.save();
        // }
    
        const newProduct = new Product({Name: name, Price: price, Description: description, Quantity: quantity, Company: company, ImageUrl: imageurl});
        await newProduct.save();

        if(!newProduct) res.status(400).json({Error: "Could not save this note"});
        res.status(200).json({msg: "Saved Succussfully",
    data:newProduct})
        
    } catch (error) {
        res.status(400).json({error:error.message});
    }  
}

exports.updateProduct = async (req, res) => {
    try {
        const {id, name, price, category, description, quantity, company, imageurl} = req.body;
        console.log(req.body);
    
       const product=await Product.findByIdAndUpdate(id, {Name: name, Price: price, Description: description, Quantity: quantity, Company: company, ImageUrl: imageurl});
           
        if(!product) res.status(404).json({error: "Error in Updating"});
        
        res.json({success: "Succefully Updated"});
            
    } catch (error) {
        res.status(400).json({error:error.message});
    }  
}

exports.deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;
    
       const product = await Product.findByIdAndDelete(id);
           
        if(!product) res.status(404).json({error: "Error in Updating"});
        
        res.json({success: "Succefully Deleted"});
            
    } catch (error) {
        res.status(400).json({error:error.message});
    }  
}

exports.fetchProductbyCategory = async (req, res) => {
    const {category} = req.params;
    console.log(req.params);

    const product = await Product.find({Category: category});
    if(!product) res.send(product);
    res.send(product);
}

exports.fetchProductbyId = async (req, res) => {
    const {id} = req.params;
    console.log(req.params);

    const product=await Product.findById(id);
    if(!product) res.send(product);
    res.send(product);
}