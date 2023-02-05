const { error } = require("console");
const Category = require("../models/category");
const Product = require("../models/product");

exports.addProduct = async (req, res) => {
    try {
        const {name, price, category, description, quantity, company, imageurl} = req.body;
        const newProduct= new Product({Name: name, Price: price, Description: description, Quantity: quantity, Company: company, ImageUrl: imageurl});
        console.log(req.body);

        for(var i=0; i<category.length; i++)
        {
            const categ = await Category.findOne({Name: category[i]});
            if(!categ)
            {
                const newcateg = new Category({Name: category[i]});
            
                newProduct.Category.push(newcateg._id);
                await newProduct.save();

                newcateg.Products.push(newProduct._id);
                await newcateg.save();
            }
            else
            {
                newProduct.Category.push(categ._id);
                await newProduct.save();

                categ.Products.push(newProduct._id);
                await newcateg.save();
            }
        }
        
        res.status(200).json({
            message:"Success",
            data:newProduct
        })
    } catch (error) {
        res.status(400).json({error:error.message});
    }  
}


//       Only this endpoint is not working

exports.updateProduct = async (req, res) => {
    try {
        const {id, name, price, category, description, quantity, company, imageurl} = req.body;
        console.log(req.body);

        const product = await Product.findById(id);
        console.log(product);
        for(var i=0; i<product.Category.length; i++)
        {
            // await Product.findById(id).populate('Category').exec(function (err, data) {
                
            // })
            const categ = await Category.findById(product.Category[i]);


            if(!categ) res.status(400).json({error: "custom"});
            categ.Products.filter(e => e !== product._id);
        }
        product.Category = [];

        for(var i=0; i<category.length; i++)
        {
            const categ = await Category.find({Name: category[i]});

            if(!categ)
            {
                const newcateg = new Category({Name: category[i]});
            
                product.Category.push(newcateg._id);
                product.Name = name;
                product.Price = price;
                product.Description = description;
                product.Quantity = quantity;
                product.Company = company;
                product.ImageUrl = imageurl;
                await product.save();

                newcateg.Products.push(product._id);
                await newcateg.save();
            }
            else
            {
                product.Category.push(categ._id);
                product.Name = name;
                product.Price = price;
                product.Description = description;
                product.Quantity = quantity;
                product.Company = company;
                product.ImageUrl = imageurl;
                await product.save();

                categ.Products.push(product._id);
                await categ.save();
            }
        }
        
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
    try {
        const {category} = req.params;
        console.log(req.params);

        const categ = Category.findOne({Name: category}).populate(
            'Products'
        ).exec(function (err, data){
            if(err) res.status(400).json({error: "Error in populating"})
            console.log(data);
            res.send(data);
        });

    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

exports.fetchProductbyId = async (req, res) => {
    const {id} = req.params;
    console.log(req.params);

    const product=await Product.findById(id);
    if(!product) res.send(product);
    res.send(product);
}