import Category from "../models/category.js"

import Product from "../models/product.js";
import MainCategory from "../models/maincategory.js"
import MostSelling from "../models/mostselling.js";

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      maincategory,
      category,
      description,
      mostselling,
      quantity,
      company,
      imageurl,
      discount,
    } = req.body;
    const newProduct = new Product({
      Name: name,
      Price: price,
      Description: description,
      MostSelling: mostselling == "true" ? true : false,
      Quantity: quantity,
      Company: company,
      ImageUrl: imageurl,
      Discount: discount,
    });
    await newProduct.save();
    (req.body);

    if (mostselling == "true") {
      const mostsellin = await MostSelling.findOne();
      if (!mostsellin) {
        const newmostsellin = new MostSelling();
        newmostsellin.Products.push(newProduct._id);
        await newmostsellin.save();
      } else {
        mostsellin.Products.push(newProduct._id);
        await mostsellin.save();
      }
    }

    const maincateg = await MainCategory.findOne({ Name: maincategory });

    if (maincateg) {
      for (var i = 0; i < category.length; i++) {
        const categ = await Category.findOne({ Name: category[i] });
        if (!categ) {
          const newcateg = new Category({ Name: category[i] });

          newProduct.Category.push(newcateg._id);
          //   await newProduct.save();

          newcateg.Products.push(newProduct._id);
          newcateg.MainCategory = maincateg._id;
          await newcateg.save();

          maincateg.Categories.push(newcateg._id);
          await maincateg.save();
        } else {
          newProduct.Category.push(categ._id);
          //   await newProduct.save();

          categ.Products.push(newProduct._id);
          categ.MainCategory = maincateg._id;

          await categ.save();

          // maincateg.Categories.push(categ._id);
        }
      }

      newProduct.MainCategory = maincateg._id;
      await newProduct.save();

      maincateg.Products.push(newProduct._id);
      await maincateg.save();

      res.status(200).json({
        message: "Success",
        data: newProduct,
      });
    } else {
      const newmaincateg = new MainCategory({ Name: maincategory });
      for (var i = 0; i < category.length; i++) {
        const categ = await Category.findOne({ Name: category[i] });
        if (!categ) {
          const newcateg = new Category({ Name: category[i] });

          newProduct.Category.push(newcateg._id);
          //   await newProduct.save();

          newcateg.Products.push(newProduct._id);
          newcateg.MainCategory = newmaincateg._id;
          await newcateg.save();

          newmaincateg.Categories.push(newcateg._id);
        } else {
          newProduct.Category.push(categ._id);
          //   await newProduct.save();

          categ.Products.push(newProduct._id);
          categ.MainCategory = newmaincateg._id;

          await categ.save();

          newmaincateg.Categories.push(categ._id);
        }
      }

      newProduct.MainCategory = newmaincateg._id;
      await newProduct.save();

      newmaincateg.Products.push(newProduct._id);
      await newmaincateg.save();

      res.status(200).json({
        message: "Success",
        data: newProduct,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//       Only this endpoint is not working

export const updateProduct = async (req, res) => {
  try {
    const {
      id,
      name,
      price,
      category,
      description,
      quantity,
      company,
      imageurl,
    } = req.body;
    (req.body);

    const product = await Product.findById(id);
    (product);
    for (var i = 0; i < product.Category.length; i++) {
      // await Product.findById(id).populate('Category').exec(function (err, data) {

      // })
      const categ = await Category.findById(product.Category[i]);

      if (!categ) res.status(400).json({ error: "custom" });
      categ.Products.filter((e) => e !== product._id);
    }
    product.Category = [];

    for (var i = 0; i < category.length; i++) {
      const categ = await Category.find({ Name: category[i] });

      if (!categ) {
        const newcateg = new Category({ Name: category[i] });

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
      } else {
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

    res.json({ success: "Succefully Updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// on cascade delete add krna h

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) res.status(404).json({ error: "Error in Updating" });

    res.json({ success: "Succefully Deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchProductbyCategory = async (req, res) => {
  try {
    const { category } = req.params;
    (req.params);

    if (category == "all") {
      const categories = await Category.find().populate("Products");

      if (!categories) {
        res.status(404).send({
          message: "No Cateogories Found",
        });
      }
      res.status(200).send({
        message: "Success",
        data: data,
      });
    }

    Category.findOne({ Name: category })
      .populate("Products")
      .exec(function (err, data) {
        if (err) res.status(400).json({ error: "Error in populating" });
        (data);
        res.status(200).send({
          message: "Success",
          data: data,
        });
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchProductbyMainCategory = async (req, res) => {
  try {
    const { maincategory } = req.params;
    (req.params);

    const categ = MainCategory.findOne({ Name: maincategory })
      .populate("Products")
      .exec(function (err, data) {
        if (err) res.status(400).json({ error: "Error in populating" });
        (data);
        res.send(data);
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchProductbyId = async (req, res) => {
  const { id } = req.params;
  (req.params);

  const product = await Product.findById(id);
  if (!product) res.send(product);
  return res.status(200).json({
    message: "Success",
    data: product,
  });
};

export const fetchproductsbyMostSelling = async (req, res) => {
  try {
    var data = await MostSelling.findOne().populate("Products");

    return res.status(200).json({
      message: "Successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const fetchProductByMainCategoryAndCategory = async (req, res) => {
  try {
    const { mainCategoryId, subCategoryId } = req.query;
    // console.log(req.par)
    var mainProductss;

    if (mainCategoryId == "null" && subCategoryId == "null") {
      return res.status(404).json({
        message: "No CateogoriesID Found",
      });
    } else if (subCategoryId == "null") {
      ("else if");
      mainProductss = await MainCategory.findById(mainCategoryId).populate(
        "Products"
      );
    } else {
      mainProductss = await Category.findById(subCategoryId).populate(
        "Products"
      );
      // (mainProducts);
    }
    if (!mainProductss) return res.status(500).json({ error: "No products" });

    const mainProduct = mainProductss.Products.filter((product) => {
      return (product.Name != "Maggi") && (product.Name != "Aloo 1kg");
    })

    return res.status(200).json({
      message: "Success",
      data: mainProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchAllProducts = async (req, res) => {
  try {
    const product = await Product.find();
    // .populate("Category")
    // .populate("MainCategory");

    if (!product) {
      return res.status(200).send({
        message: "No data",
        data: product,
      });
    }

    return res.status(200).send({
      message: "Success",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updatemostsellingtag = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(200).send({
        message: "No data",
        data: product,
      });
    }

    product.MostSelling = true;
    await product.save();

    return res.status(200).send({
      message: "Success",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const fixmostsellinproducts = async (req, res) => {
  try {
    var prdctids = [];

    var prdctlist = await Product.find();
    for (var i = 0; i < prdctlist.length; i++) {
      if (prdctlist[i].MostSelling == true)
        prdctids.push(prdctlist[i]._id);
    }

    var mostsell = await MostSelling.findOne();

    for (var i = 0; i < prdctids.length; i++) {
      mostsell.Products.push(prdctids[i]);
    }

    await mostsell.save();

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}


