// Importing the actions
import {
    ADD_PRODUCT_PAGE,
    ADD_TO_CART,
    ADD_TO_DATABASE,
    ADD_TO_UNSORTED_DATA,
    ALL_PRODUCTS_PAGE,
    CART_PAGE,
    DELETE_FROM_CART,
    DELETE_FROM_DATABASE,
    EDITABLE,
    FETCHED_DATA,
    ITEM_DETAILS_DATA,
    ITEM_DETAILS_PAGE,
    UNSORTED_DATA,
  } from "../actions/reduxActions";
  
  // Creating initial state for dataReducer
  const initialState = {
    data: [],
    cart: [],
    unsorted_data: [],
    item_detail: [],
  };
  
  // Creating reducer for data
  export function dataReducer(state = initialState, action) {
    switch (action.type) {
      case FETCHED_DATA:
        return {
          ...state,
          data: action.data,
        };
      case UNSORTED_DATA:
        return {
          ...state,
          unsorted_data: action.newData,
        };
      case ADD_TO_CART:
        return {
          ...state,
          cart: [...state.cart, action.item],
        };
      case DELETE_FROM_CART:
        return {
          ...state,
          cart: action.data,
        };
      case ADD_TO_DATABASE:
        return {
          ...state,
          data: [...state.data, action.newData],
        };
      case ADD_TO_UNSORTED_DATA:
        return {
          ...state,
          unsorted_data: [...state.unsorted_data, action.newData],
        };
      case DELETE_FROM_DATABASE:
        return {
          ...state,
          data: action.newData,
        };
      case ITEM_DETAILS_DATA:
        return {
          ...state,
          item_detail: action.newData,
        };
      case EDITABLE:
        return{
          ...state,
          data:action.newData
        }
      default:
        return state;
    }
  }
  
  // Creating initial state for pageReducer
  const initialPage = {
    page: ["all_products_page"],
  };
  
  // Creating reducer for pages
  export function pageReducer(state = initialPage, action) {
    switch (action.type) {
      case ALL_PRODUCTS_PAGE:
        return {
          page: ["all_products_page"],
        };
      case CART_PAGE:
        return {
          page: ["cart_page"],
        };
      case ADD_PRODUCT_PAGE:
        return {
          page: ["add_product_page"],
        };
      case ITEM_DETAILS_PAGE:
        return {
          page: ["item_details_page"],
        };
      default:
        return state;
    }
  }
  
  
  