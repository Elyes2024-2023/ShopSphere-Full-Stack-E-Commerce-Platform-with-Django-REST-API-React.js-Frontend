import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL
} from "../constants/productConstants";

/**
 * Fetches the list of products from the server and dispatches relevant actions.
 *
 * @returns {Function} - A thunk function that performs the API request
 * and dispatches actions based on the response.
 */
export const listProducts = () => async (dispatch) => {
  try {
    // Dispatch request action to indicate that the request is starting
    dispatch({ type: PRODUCT_LIST_REQUEST });

    // Perform the API call to fetch products
    const { data } = await axios.get("/api/products/");

    // Dispatch success action with fetched data
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // Dispatch failure action if an error occurs
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

/**
 * Fetches the details of a specific product based on its ID.
 *
 * @param {string} id - The ID of the product to fetch.
 * @returns {Function} - A thunk function that performs the API request
 * and dispatches actions based on the response.
 */
export const listProductDetails = (id) => async (dispatch) => {
  try {
    // Dispatch request action to indicate that the request is starting
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    // Perform the API call to fetch product details
    const { data } = await axios.get(`/api/products/${id}`);

    // Dispatch success action with fetched data
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // Dispatch failure action if an error occurs
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
