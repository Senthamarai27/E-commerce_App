// Imorting Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Fucntion to add item to Cart
export function add_item_toastify() {
  const notify = () => toast.success("Item Added to Cart Successfully",{
    theme:"light"
  });
  notify();
}
// Fucntion to Delete Item
export function delete_item_toastify() {
  const notify = () => toast.success("Item Deleted Successfully");
  notify();
}
// Fucntion to add item to database
export function add_item_database_toastify() {
  const notify = () => toast.success("Item Added Successfully");
  notify();
}
// Fucntion to sort data
export function data_sorted_toastify() {
  const notify = () => toast.success("Sorted Successfully");
  notify();
}
// Fucntion to unsort data
export function unsorted_toastify() {
  const notify = () => toast.success("Unsorted Successfully");
  notify();
}
// Fucntion to cancel the editing of item
export function edit_cancel_toastify() {
  const notify = () => toast.success("Editing Canceled Successfully");
  notify();
}
// Fucntion to save editing of item
export function edit_done_toastify() {
  const notify = () => toast.success("Editing Done Successfully");
  notify();
}
// Fucntion to show warning if right value is not entered in the input
export function addRightRating() {
  const notify = () => toast.warn("Add Rating from 0-5");
  notify();
}
