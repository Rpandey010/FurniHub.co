const Product = require('../model/product.model'); // Assuming the Product model is in the models directory
const { sendNewProductEmail } = require('../mail/product.mail'); // Import the email function

exports.createProduct = async (req, res) => {
  try {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
      let last_product_array = products.slice(-1);
      let last_product = last_product_array[0];
      id = last_product.id + 1;
    } else {
      id = 1;
    }
    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
      address: req.body.address,
      height: req.body.height,
      width: req.body.width,
      length: req.body.length,
      emailID: req.body.emailID,
      sellerName: req.body.sellerName,
      description: req.body.description,  
    });

    console.log(product);
    await product.save();

    // Call sendNewProductEmail function with emailID parameter
    sendNewProductEmail(product.emailID, product);

    console.log("Saved");
    res.json({ success: true, name: req.body.name });
  } catch (error) {
    console.error("Error occurred while creating product:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};





exports.removeProduct = async (req, res) => {
  const product = await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({success:true,name:req.body.name})
};

exports.getAllProducts = async (req, res) => {
    let products = await Product.find({});
    console.log("All Products");
    res.send(products);
  };
  
  exports.getNewCollections = async (req, res) => {
    let products = await Product.find({});
    let arr = products.slice(1).slice(-8);
    console.log("New Collections");
    res.send(arr);
  };
  
  exports.getPopularInWomen = async (req, res) => {
    let products = await Product.find({});
    let arr = products.splice(0,  4);
    console.log("Popular In Women");
    res.send(arr);
  };

  
  exports.searchProductByName = async (req, res) => {
    const searchQuery = req.query.name;
    try {
        const products = await Product.find({ name: { $regex: new RegExp(searchQuery, "i") } });
        res.send(products);
    } catch (error) {
        console.error("Error occurred during search:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}
exports.getAllProductsByUser = async (req, res) => {
  const emailID = req.query.emailID;
  try {
      const products = await Product.find({ emailID: emailID });
      res.send(products);
  } catch (error) {
      console.error("Error occurred while fetching products:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

exports.updateProduct = async (req, res) => {
  const { id, name, new_price, address, description } = req.body;
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { id: id },
      { $set: { name: name, new_price: new_price, address: address, description: description } },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }
    res.json({ success: true, updatedProduct });
  } catch (error) {
    console.error("Error occurred while updating product:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

