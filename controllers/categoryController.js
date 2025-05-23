import Category from "../models/category.js"
import MainCategory from "../models/maincategory.js"
import Product from "../models/product.js"

export const addCatergory = async (req, res) => {
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

export const getCategoryByMaincategory = async (req, res) => {
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

export const getAllCategory = async (req, res) => {
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

export const deleteCategory = async (req, res) => {
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

export const getCategoryByName = async (req, res) => {
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

export const updateCategory = async (req, res) => {
    try {
        var categories = await Category.find().populate('Products');

        for (var i = 0; i < categories.length; i++) {
            var category = categories[i];
            category.imageurl = category.Products[0].ImageUrl[0];
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


export const getallMainCategory = async (req, res) => {
    try {
        var data = await MainCategory.find();

        function compare(a, b) {
            if (a.Name < b.Name) {
                return -1;
            }
            if (a.Name > b.Name) {
                return 1;
            }
            return 0;
        }

        data.sort(compare);

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

export const fixmaincategory = async (req, res) => {
    try {
        var galatmaincateg = await MainCategory.findOne({ Name: 'HouseHold' });
        var galatproducts = galatmaincateg.Products;


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

