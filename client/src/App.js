import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Footer from "./Components/Footer/Footer";
import ShopCategory from "./Pages/ShopCategory";
import Bed_banner from "./Components/Assets/Bed_banner.png";
import miscellaneous_banner from "./Components/Assets/miscellaneous_banner.png";
import wardrobe_banner from "./Components/Assets/wardrobe_banner.png";
import Table_banner from "./Components/Assets/Table_banner.png";
import Chair_banner from "./Components/Assets/Chair_banner.png";
import LoginSignup from "./Pages/LoginSignup";
import Search from "./Components/Search/search";
import AddProduct from "./Components/AddProduct/AddProduct";
import ListProduct from "./Components/ListProduct/ListProduct";
import OrderHistory from "./Components/History/orderHistory";
import Aboutus from "./Components/AboutUs/Aboutus";
import FAQ from "./Components/FAQ/FAQ";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy";
import OrderSuccessfully from "./Components/OrderSuccessful/ordersuccessful";

function App() {

  return (
    <div className="m-0">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop gender="all" />} />
          <Route path="/table" element={<ShopCategory banner={Table_banner} category="table" />} />
          <Route path="/chair" element={<ShopCategory banner={Chair_banner} category="chair" />} />
          <Route path="/almirah" element={<ShopCategory banner={wardrobe_banner} category="almirah" />} />
          <Route path="/bed" element={<ShopCategory banner={Bed_banner} category="bed" />} />
          <Route path="/miscellaneous" element={<ShopCategory banner={miscellaneous_banner} category="miscellaneous" />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/search" element={<Search />} /> {/* Define /search route at the same level as other routes */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/list-product" element={<ListProduct />} />
          <Route path="/login" element={<LoginSignup/>} />
          <Route path="/About-us" element={<Aboutus />} />
          <Route path="/FAQ" element={<FAQ/>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/order-success" element={<OrderSuccessfully />} />

        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;