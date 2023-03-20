const Category = require("../models/category")
const MainCategory = require("../models/maincategory");
const Product = require("../models/product");
const MostSelling = require("../models/mostselling");

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
<<<<<<< HEAD

=======
>>>>>>> d7c4d02345e38b04c41d02aff4200148aac2e046
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
<<<<<<< HEAD

=======
>>>>>>> d7c4d02345e38b04c41d02aff4200148aac2e046
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

exports.updateCategory = async (req, res) => {
    try {
        var categories = await Category.find().populate('Products');

        for (var i = 0; i < categories.length; i++) {
            var category = categories[i];
            category.imageurl = category.Products[0].ImageUrl[0];
            console.log(category);
            console.log("This is category", category.imageurl);
            await category.save();
            // await Category.save();
        }

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


exports.getallMainCategory = async (req, res) => {
    try {
        console.log("hiiiiiiiiiiiiiiiiiii");
        const data = await MainCategory.find();

        res.status(200).send({
            message: "Success",
            data: data
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

exports.fixmaincategory = async (req, res) => {
    try {
        var galatmaincateg = await MainCategory.findOne({ Name: 'HouseHold' });
        var galatproducts = galatmaincateg.Products;

        console.log(galatproducts);

        var sahimaincateg = await MainCategory.findOne({ Name: 'Household' });

        for (var i = 0; i < galatproducts.length; i++) {
            sahimaincateg.Products.push(galatproducts[i]);

            var producttobechanged = await Product.findById(galatproducts[i]);
            producttobechanged.MainCategory = sahimaincateg._id;
            await producttobechanged.save();
        }

        var galatcategory = galatmaincateg.Categories;

        for (var i = 0; i < galatcategory.length; i++) {
            sahimaincateg.Products.push(galatcategory[i]);

            var categtobechanged = await Category.findById(galatcategory[i]);
            categtobechanged.MainCategory = sahimaincateg._id;
            await categtobechanged.save();
        }

        await sahimaincateg.save();

        res.status(200).send({
            message: "Success",
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

