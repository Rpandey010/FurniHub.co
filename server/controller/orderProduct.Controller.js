// orderProductController.js

exports.createOrderProducts = async (req, res) => {
    try {
      // Retrieve order product data from the request body
      const orderProductsData = req.body;
  
      // Save the order products data to the database
  
      // Respond with a success message
      res.status(201).json({ message: 'Order products saved successfully!' });
    } catch (error) {
      // Handle errors
      console.error('Error saving order products:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  