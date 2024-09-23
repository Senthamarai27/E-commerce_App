// Importing css
import '../assets/css/AddProduct.css'

// Importing React
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

// importing redux action creators
import { add_to_database, add_to_unsorted_data } from '../redux/actions/reduxActions';

// importing toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// importing toastify functions
import { addRightRating, add_item_database_toastify } from './ToastifyFunc';


function AddProduct() {
  const dispatch = useDispatch()

  // Storing form data localy in state which will later be updated in store
  const [formData, setFormData] = useState({
    title:"",
    description:"",
    price:"",
    rating:"",
    image:"",
  });

  // Function to add item to database 
  function addItemToDatabase(e){
    e.preventDefault()
    // Adding condition to take right value for rating as input
    if(formData.rating > 5 || formData.rating < 0){
      addRightRating()
      return;
    }
    // Dispatching data to database
    dispatch(add_to_database(formData))
    dispatch(add_to_unsorted_data(formData))
    setFormData({
      title:"",
    description:"",
    price:"",
    rating:"",
    })
    add_item_database_toastify()
  }
  return (
    <div className='addProduct'>

      {/* Using form to collect data from user */}
        <form>
        <div className='addContainer'>
        <p className='heading'>Add Product</p>
        <input type="text" placeholder='Item Name...' value={formData.title} onChange={(e)=>{setFormData({...formData,title:e.target.value})}}required/>
        <textarea type="text" placeholder='Item desc...' value={formData.description} onChange={(e)=>{setFormData({...formData,description:e.target.value})}} required></textarea>
        <input type="number" placeholder='Item price...' value={formData.price} onChange={(e)=>{setFormData({...formData,price:e.target.value})}}required />
        <input type="number" placeholder='Item Rating...' max={5} min={0}  value={formData.rating} onChange={(e)=>{setFormData({...formData,rating:e.target.value})}} required/>
        <button type='submit' className='addBtn' onClick={(e)=>{addItemToDatabase(e)}}>Add</button>
        </div>
        </form>
        {/* Using toastify component for notification */}
        <ToastContainer />
    </div>
  )
}

export default AddProduct;