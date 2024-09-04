// Importing css
import "../assets/css/ItemDetails.css";

// Importing react and hooks to get and send data to store
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Importing action creator
import { add_to_cart } from "../redux/actions/reduxActions";

// Imorting react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Imoprtin toastify function
import { add_item_toastify } from "./ToastifyFunc";

// Importing rating function
import { callRating } from "./RatingFunc";


function ItemDetails() {
  const itemData = useSelector((state)=>state.dataR.item_detail)
  const storeData = useSelector((state)=>state.dataR.data)
  const dispatch = useDispatch()

  // Function to add item to cart
  function addToCartFromItem(value){
    const newData = storeData.filter((item)=> item.title === value)
    dispatch(add_to_cart(newData[0]))
    add_item_toastify()
  }
  return (
    
    <div className="itemDetailsContainer">
      {
        itemData.map((item,index)=>(
          <div className="itemDetails"key={index}>
        <div className="itemImgRatingPrice">
          <img  src={item.image} alt="img not found"/>
          <div className="itemDetailsRight">
            <div className="itemDetailsHeading">{item.title}</div>
          <div className="itemDetailsRating">
            Rating: &nbsp;
            {callRating(1-item.rating)}
            {callRating(2-item.rating)}
            {callRating(3-item.rating)}
            {callRating(4-item.rating)}
            {callRating(5-item.rating)}
            
          </div>
          <div className="itemDetailsPrice">Price: <strong>{item.price}</strong></div>
          </div>
        </div>
        <div className="itemDetailsDesc">
            <strong>Item Description: </strong>{item.description}
        </div>
        {/* Add to cart Button */}
        <button className="itemDetailsAddBtn" onClick={()=>addToCartFromItem(item.title)}>Add to Cart</button>
      </div>
        ))
      }
      {/* React Toastify Component */}
      <ToastContainer />
    </div>
  );
}
// Exporting ItemDetails Component
export default ItemDetails;
