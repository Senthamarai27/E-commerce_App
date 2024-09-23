// Importing css
import "../assets/css/AllProducts.css";
// Importing react and hooks to get and send the data to store
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Imoporting actions
import {
  ITEM_DETAILS_PAGE,
  add_to_cart,
  delete_from_database,
  fetchData,
  item_details_data,
  item_details_page,
  unsorted_data,
} from "../redux/actions/reduxActions";

// Importing action creators
import {
  addRightRating,
  add_item_toastify,
  data_sorted_toastify,
  delete_item_toastify,
  edit_cancel_toastify,
  edit_done_toastify,
  unsorted_toastify,
} from "./ToastifyFunc";
// Importing react toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Importing rating function
import { callRating } from "./RatingFunc";

const AllProducts = () => {
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state.dataR.data);
  const storeDataUnsorted = useSelector((state) => state.dataR.unsorted_data);

  // Creating a state to show loading
  const [loading, setLoading] = useState(true);

  // Storing the editinfo data in the state localy which will be sent to store later
  const [itemInfo,setItemInfo] = useState({
    title:"",
    description:"",
    rating:"",
    price:"",
    image:"",
  })
  const isTrue = "true";

  // Function to add item to cart
  function add_item_to_cart(index) {
    add_item_toastify();
    dispatch(add_to_cart(storeData[index]));
  }
  // Function to delete item from the database
  function delete_item_from_database(index) {
    const filteredData = storeData.filter(
      (item) => storeData.indexOf(item) !== index
    );
    dispatch(delete_from_database(filteredData));
    delete_item_toastify();
  }
  function sortedObj(a, b) {
    if (a.price < b.price) {
      return 1;
    }
    if (a.price > b.price) {
      return -1;
    }
    return 0;
  }
  // Function to sort the data
  function sortData() {
    const clonedArr = [...storeData];
    clonedArr.sort(sortedObj);
    dispatch(fetchData(clonedArr));
    data_sorted_toastify();
  }
  // Function to remove sort
  function removeSort() {
    dispatch(fetchData(storeDataUnsorted));
    unsorted_toastify();
  }
  // Function to see item details of the item
  function seeItemDetails(index) {
    const newData = storeData.filter(
      (item) => storeData.indexOf(item) === index
    );
    dispatch(item_details_data(newData));
    dispatch(item_details_page(ITEM_DETAILS_PAGE));
  }
  // functin to edit the item when clicked on the pencil icon
  function editItem(index, value) {
    const selectedItemforEdit = storeData.filter(
      (item) => storeData.indexOf(item) === index
    );
    const mapOverSelectedItem = selectedItemforEdit.map((item) => ({
      ...item,
      edit: `${value}`,
    }));
    const newData = [...storeData];
    newData.splice(index, 1, mapOverSelectedItem[0]);
    dispatch(fetchData(newData));
    if(value === false){
      edit_cancel_toastify()
    }
  }
  // Function to save the edited item
  function saveEditItem(index){
    if(itemInfo.rating > 5 || itemInfo.rating<0){
      addRightRating()
      return;
    }
    const selectedItemforEdit = storeData.filter(
      (item) => storeData.indexOf(item) === index
    );
    const mapOverSelectedItem = selectedItemforEdit.map((item) => ({
      ...item,
      title:itemInfo.title,
      description:itemInfo.description,
      rating:itemInfo.rating,
      price:itemInfo.price,
      edit: "false",
    }));
    const newData = [...storeData];
    newData.splice(index, 1, mapOverSelectedItem[0]);
    dispatch(fetchData(newData));
    dispatch(unsorted_data(newData))
    edit_done_toastify()
    setItemInfo({
      title:"",
    description:"",
    rating:"",
    price:"",
    image:"",
    })
  }

  // Fetching the data from the api and updating to store
  useEffect(() => {
    function clearFilter() {
      (async function fetchDataFromAPI() {
        const data = await fetch(
          `https://my-json-server.typicode.com/Senthamarai27/ecommerce_data/products`
        );
        const json = await data.json();
        const editableData = json.map((item) => ({ ...item, edit: "false" }));
        dispatch(fetchData(editableData));
        dispatch(unsorted_data(editableData));
        setLoading(false);
      })();
    }
    if (storeData.length === 0) {
      clearFilter();
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <div className="allProductsContainer">
      <div className="sortDiv">
        <button
          className="sortButton"
          onClick={() => {
            sortData();
          }}
        >
          Sort Items
        </button>
        <button
          className="removeSortButton"
          onClick={() => {
            removeSort();
          }}
        >
          <i className="fa-solid fa-square-xmark" style={{ color: "red" }}></i>
        </button>
      </div>
      {loading ? (
        <div style={{ marginTop: "10rem" }}>
          <h1 style={{ color: "white" }}>Loading....</h1>
        </div>
      ) : (
        // Mapping over the store data
        storeData.map((item, index) => (
          <div className="product" key={index}>
            <div className="allProductsLeft">
              <img src={item.image} alt="img not found" />
            </div>
            <div className="allProductsRight">
              <div className="allProductsContent">
                {/* conditional rendering of product name */}
                {isTrue !== item.edit ? (
                  <p className="allProductsHeading">{item.title}</p>
                ) : (
                  <input
                    className="inputHeading"
                    type="text"
                    onChange={(e)=>{setItemInfo({...itemInfo,title:e.target.value})}}
                    value={itemInfo.title}

                  />
                )}
                {/* Conditional rendering of product description */}
                {isTrue !== item.edit ? (
                  <p className="allProductsDesc">{item.description}</p>
                ) : (
                  <textarea
                    cols={100}
                    className="inputDesc"
                    onChange={(e)=>{setItemInfo({...itemInfo,description:e.target.value})}}
                    value={itemInfo.description}
                  ></textarea>
                )}
              </div>
              <div className="itemPriceRatingDeleteBtn">
                <div className="itemRating">
                  Rating:&nbsp;
                  {/* Conditioal rendering of product rating */}
                  {isTrue !== item.edit ? (
                    <div>
                      {/* Funtion to show the rating */}
                      {callRating(1-item.rating)}
                      {callRating(2-item.rating)}
                      {callRating(3-item.rating)}
                      {callRating(4-item.rating)}
                      {callRating(5-item.rating)}
                    </div>
                  ) : (
                    <input
                      type="number"
                      onChange={(e)=>{setItemInfo({...itemInfo,rating:e.target.value})}}
                      value={itemInfo.rating}
                      className="inputRating"
                    />
                  )}
                </div>
                <div className="itemPrice">
                  Price:{" "}
                  {/* Conditional rendering of product price */}
                  {isTrue !== item.edit ? (
                    <strong>{item.price}</strong>
                  ) : (
                    <input
                      className="inputPrice"
                      type="number"
                      onChange={(e)=>{setItemInfo({...itemInfo,price:e.target.value})}}
                      value={itemInfo.price}
                    />
                  )}
                </div>
                    {/* Conditional rendering of buttons */}
                {isTrue !== item.edit ? (
                  <div>
                    <button
                      className="allProductsDeleteBtn"
                      onClick={() => delete_item_from_database(index)}
                    >
                      <i
                        class="fa-solid fa-trash fa-2x"
                        style={{ color: "red" }}
                      ></i>
                      <p className="tooltip" style={{ color: "red" }}>
                        Remove Product
                      </p>
                    </button>
                    <button
                      className="allProductsEditBtn"
                      onClick={() => {
                        // setEdit(true);
                        const boolval = true;
                        setItemInfo({title:item.title,description:item.description,rating:item.rating,price:item.price,image:item.image})
                        editItem(index, boolval);
                      }}
                    >
                      <i
                        className="fa-solid fa-pen-to-square fa-2x"
                        style={{ color: "#374151" }}
                      ></i>
                      <p className="tooltip" style={{ color: "#374151" }}>
                        Edit Item
                      </p>
                    </button>
                    <button
                      className="addToCart"
                      onClick={() => {
                        add_item_to_cart(index);
                      }}
                    >
                      <i
                        class="fa-solid fa-cart-plus fa-2x"
                        style={{ color: "#374151" }}
                      ></i>
                      <p className="tooltip" style={{ color: "#374151" }}>
                        Add To Cart
                      </p>
                    </button>
                    <button
                      className="itemDetailsBtn"
                      onClick={() => {
                        seeItemDetails(index);
                      }}
                    >
                      <i
                        className="fa-solid fa-circle-info fa-2x"
                        style={{ color: "#374151" }}
                      ></i>
                      <p className="tooltip" style={{ color: "#374151" }}>
                        See Item Details
                      </p>
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className="cancelBtn"
                      onClick={() =>{
                        const boolval = false; 
                        editItem(index, boolval)}}
                    >
                      Cancel
                    </button>
                    <button
                      className="saveBtn"
                      onClick={() => {
                        saveEditItem(index)
                      }}
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
      <ToastContainer />
    </div>
  );
};
// Exporting All products component
export default AllProducts;
