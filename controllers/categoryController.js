const Category = require("../models/category");
const MainCategory = require("../models/maincategory");

exports.addCatergory = async (req, res) => {
    try {
        const { name, url } = req.body;

        if (!name || !url) {
            return res.status(500).json({
                message: "Please provide name and url"
            })
        }
        const existCategory = await Category.find({ name: name });
        if (existCategory) {
            res.status(400).json({
                message: "Success",
                data: category
            })
        }

        const category = new Category({ name, url });
        await category.save();

        res.status(201).json({
            message: "Success",
            data: category
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

exports.getCategoryByMaincategory = async (req, res) => {
    try {

        const { mainCategoryId } = req.params;
        const categories = await Category.find({ MainCategory: mainCategoryId });
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

exports.getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find();
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

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(404).send({
                message: "No Id Found",
                // data: category
            })
        }
        const category = await Category.deleteOne({ _id: id });
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

exports.getCategoryByName = async (req, res) => {
    try {
        const { name } = req.params;
        if (!name) {
            res.status(404).send({
                message: "No Name found",

            })
        }

        const category = await Category.findOne({ Name: name }).populate('Products');

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