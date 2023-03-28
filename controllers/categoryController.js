import Category, { find, deleteOne, findOne, findById } from "../models/category.js";
import { find as _find, findOne as _findOne } from "../models/maincategory.js";
import { findById as _findById } from "../models/product.js";

export async function addCatergory(req, res) {
    try {
        const { name, url } = req.body;

        if (!name || !url) {
            return res.status(500).json({
                message: "Please provide name and url"
            })
        }
        const existCategory = await find({ name: name });
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

export async function getCategoryByMaincategory(req, res) {
    try {

        const { mainCategoryId } = req.params;
        const categories = await find({ MainCategory: mainCategoryId });
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

export async function getAllCategory(req, res) {
    try {
        const categories = await find();
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

export async function deleteCategory(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(404).send({
                message: "No Id Found",
                // data: category
            })
        }
        const category = await deleteOne({ _id: id });
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

export async function getCategoryByName(req, res) {
    try {
        const { name } = req.params;
        if (!name) {
            res.status(404).send({
                message: "No Name found",

            })
        }

        const category = await findOne({ Name: name }).populate('Products');

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

export async function updateCategory(req, res) {
    try {
        var categories = await find().populate('Products');

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


export async function getallMainCategory(req, res) {
    try {
        var data = await _find();

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

export async function fixmaincategory(req, res) {
    try {
        var galatmaincateg = await _findOne({ Name: 'HouseHold' });
        var galatproducts = galatmaincateg.Products;


        var sahimaincateg = await _findOne({ Name: 'Household' });

        for (var i = 0; i < galatproducts.length; i++) {
            sahimaincateg.Products.push(galatproducts[i]);

            var producttobechanged = await _findById(galatproducts[i]);
            producttobechanged.MainCategory = sahimaincateg._id;
            await producttobechanged.save();
        }

        var galatcategory = galatmaincateg.Categories;

        for (var i = 0; i < galatcategory.length; i++) {
            sahimaincateg.Products.push(galatcategory[i]);

            var categtobechanged = await findById(galatcategory[i]);
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

