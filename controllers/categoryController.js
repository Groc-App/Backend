const Category = require("../models/category")

exports.addCatergory=async(req,res)=>{

    try {
        const {name}=req.body
        const category=new Category({Name:name});
        await category.save();

        res.status(201).send({
            message: "Success",
            data: category
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

exports.getAllCategory=async(req,res)=>{
    try {
        
        const categories=Category.find();
        res.status(200).send({
            message: "Success",
            data: categories
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

exports.deleteCategory=async(req,res)=>{
    try {
        const {id}=req.params;
        const category=Category.deleteOne({_id:id});
        res.status(200).send({
            message: "Success",
            data: category
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

// exports.updateCa