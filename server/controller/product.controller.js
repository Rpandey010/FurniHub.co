const Product = require('../model/product.model'); // Assuming the Product model is in the models directory

exports.createProduct =  async (req, res) => {
      let products = await Product.find({});
      let id;
      if (products.length>0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
      }
      else
      { id = 1; }
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
      });
    
      console.log(product);
      await product.save();
      console.log("Saved");
      res.json({success:true,name:req.body.name})
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
