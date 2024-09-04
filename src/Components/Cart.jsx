// Importing css
import "../assets/css/Cart.css";

// Imoprting react hooks
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Importing react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importing action creators
import { delete_from_cart } from "../redux/actions/reduxActions";

// Importing toastify functions
import { delete_item_toastify } from "./ToastifyFunc";

// Imoporting rating functions
import { callRating } from "./RatingFunc";

function Cart() {
  const cart_data = useSelector((state) => state.dataR.cart);
  const dispatch = useDispatch();

  const [empty, setEmpty] = useState(true);

  // Function to delete data from cart
  function delete_from_cart_function(index) {
    const filteredData = cart_data.filter(
      (item) => cart_data.indexOf(item) !== index
    );
    dispatch(delete_from_cart(filteredData));
    delete_item_toastify();
    if (filteredData.length === 0) {
      setEmpty(true);
    }
  }

  // Showing (no items in cart) if cart is empty
  useEffect(() => {
    const numberOfItems = cart_data.length;
    if (numberOfItems !== 0) {
      setEmpty(false);
    }
  }, empty);
  return (
    <div className="cartContainer">
      {/* Doing conditional rendering based on (empty) value */}
      {empty ? (
        <div style={{ fontSize: "2rem", color: "#00FFEE", marginTop: "10rem" }}>
          Oops!!! No items in the cart
        </div>
      ) : (
        // Mapping over the cart items
        cart_data.map((item, index) => (
          <div className="cartItem" key={index}>
            <div className="cartLeft">
              <img src={item.image} alt="img not found" />
            </div>
            <div className="cartRight">
              <div className="cartItemContent">
                <p className="cartItemHeading">{item.title}</p>
                <p className="cartItemDesc">{item.description}</p>
              </div>
              <div className="itemPriceRatingDeleteBtn">
                <div className="itemRating">
                  Rating:&nbsp;
                  {/* Calling the rating function */}
                  {callRating(1 - item.rating)}
                  {callRating(2 - item.rating)}
                  {callRating(3 - item.rating)}
                  {callRating(4 - item.rating)}
                  {callRating(5 - item.rating)}
                </div>
                <div className="itemPrice">
                  Price: <strong>{item.price}</strong>
                </div>
                <button
                  className="cartDeleteBtn"
                  onClick={() => {
                    delete_from_cart_function(index);
                  }}
                >
                  <i class="fa-solid fa-trash fa-2x"></i>
                  <p className="tooltip">Remove Item from Cart</p>
                </button>
              </div>
            </div>
          </div>
        ))
      )}
      {/* Using the react-toastify component */}
      <ToastContainer />
    </div>
  );
}
// Exporting cart component
export default Cart;
