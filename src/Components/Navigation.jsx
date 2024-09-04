// Importing css
import "../assets/css/Navigation.css";

// Importing react
import React from "react";

// Importing logo image
import logo from "../assets/images/e-comm.jfif";

// Importing hooks for get and send data to store
import { useDispatch, useSelector } from "react-redux";

// Imoprting actions
import {
  ADD_PRODUCT_PAGE,
  ALL_PRODUCTS_PAGE,
  CART_PAGE,
  add_product_page,
  all_products_page,
  cart_page,
} from "../redux/actions/reduxActions";

function Navigation() {
  const cartItems = useSelector((state) => state.dataR.cart);
  const shufflePage = useDispatch();

  // Function to change the pages when clicked on the links/buttons
  function changingPage(pageName) {
    if (pageName === "add_product_page") {
      shufflePage(add_product_page(pageName));
    } else if (pageName === "all_products_page") {
      shufflePage(all_products_page(pageName));
    } else if (pageName === "cart_page") {
      shufflePage(cart_page(pageName));
    }
  }
  return (
    <div className="nav">
      <div className="left">
        <h3 style={{color:"blue"}}>ECOMMERCE</h3>
        {/* <img
          className="logoImage"
          src={logo}
          style={{ width: "80px", marginLeft: "3rem" }}
          alt="E-CoMM"
        /> */}
        {/* Button for all products page */}
        <button
          className="navButton"
          style={{ marginLeft: "2rem" }}
          onClick={() => changingPage(ALL_PRODUCTS_PAGE)}
        >
          Products
        </button>
        {/* Button for add products page */}
        <button
          className="navButton"
          onClick={() => changingPage(ADD_PRODUCT_PAGE)}
        >
          Add Product&nbsp;
          <i className="fa-solid fa-plus" style={{ color: "#374151" }}></i>
        </button>
      </div>
      {/* Button for cart page */}
      <div className="right">
        <button className="cartButton" onClick={() => changingPage(CART_PAGE)}>
          Cart Items :&nbsp;{cartItems.length}
        </button>
      </div>
    </div>
  );
}
// Exporting navigatin component
export default Navigation;
