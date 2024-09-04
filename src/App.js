// Importing CSS file for app component
import "./App.css";

// Importing all the Components
import Navigation from "./Components/Navigation";
import AllProducts from "./Components/AllProducts";
import Cart from "./Components/Cart";
import AddProduct from "./Components/AddProduct";
import ItemDetails from "./Components/ItemDetails";

// Imoprting use Selector for getting data from store
import { useSelector } from "react-redux";

function App() {
  const page = useSelector((state) => state.pageR.page);
  return (
    <>
      <Navigation />
      {/* Using Conditional rendering to redner different pages */}
      {page[0] === "all_products_page" ? (
        <AllProducts />
      ) : page[0] === "cart_page" ? (
        <Cart />
      ) : page[0] === "add_product_page" ? (
        <AddProduct />
      ) : page[0] === "item_details_page" ? (
        <ItemDetails />
      ) : (
        ""
      )}
    </>
  );
}
// Exporting the app component
export default App;
