import React, { createContext, useReducer } from "react";
import {
    ADD_PRODUCT_FAILED,
    ADD_PRODUCT_SUCCESS,
    EDIT_PRODUCT_FAILED,
    EDIT_PRODUCT_FETCH_FAILED,
    EDIT_PRODUCT_FETCH_SUCCESS,
    EDIT_PRODUCT_SUCCESS,
    PRODUCT_DELETE_FAILED,
    PRODUCT_DELETE_SUCCESS,
} from "./ProductContextUtils";
import axios from "axios";
import { API_URL } from "../../utils/urlUtil";
import { SET_LOADING } from "../../components/Loading";

export const productContext = createContext();

const INITIAL_STATE = {
    userAuth: JSON.parse(localStorage.getItem("userAuth")),
    editProduct: null,
    loading: false,
    error: null,
};
const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };
        case ADD_PRODUCT_FAILED:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case EDIT_PRODUCT_FETCH_SUCCESS: {
            return {
                ...state,
                editProduct: payload,
                loading: false,
                error: null,
            };
        }
        case EDIT_PRODUCT_FETCH_FAILED: {
            return {
                ...state,
                editProduct: null,
                loading: false,
                error: payload,
            };
        }
        case EDIT_PRODUCT_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: null,
            };
        }
        case EDIT_PRODUCT_FAILED: {
            return {
                ...state,
                loading: false,
                error: payload,
            };
        }
        case PRODUCT_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };
        case PRODUCT_DELETE_FAILED:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: payload,
            };

        default:
            return state;
    }
};

const ProductContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const addProduct = async (formData) => {
        const boundary =
            "---------------------------" + Date.now().toString(16);
        const config = {
            headers: {
                "Content-Type": `multipart/form-data; boundary=${boundary}`,
                Authorization: `Bearer ${state.userAuth.token}`,
            },
        };
        try {
            const res = await axios.post(
                `${API_URL}/Product`,
                formData,
                config
            );
            if (res?.data?.status === "success") {
                dispatch({
                    type: ADD_PRODUCT_SUCCESS,
                    payload: res?.data?.newProduct,
                });
            }
            console.log(res);
            window.location.href = "/admin";
        } catch (error) {
            dispatch({
                type: ADD_PRODUCT_FAILED,
                payload: error?.response?.data,
            });
            console.log(error);
        }
    };
    const editProductValues = async (id) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${state.userAuth.token}`,
            },
        };
        dispatch({ type: SET_LOADING, payload: true });
        try {
            const res = await axios.get(`${API_URL}/Product/${id}`, config);
            if (res?.data?.status === "success") {
                dispatch({
                    type: EDIT_PRODUCT_FETCH_SUCCESS,
                    payload: res?.data?.product,
                });
            }
            console.log(res);
            // return res?.data?.product;
        } catch (error) {
            dispatch({
                type: EDIT_PRODUCT_FETCH_FAILED,
                payload: error?.response?.data,
            });
            console.log(error);
        }
        dispatch({ type: SET_LOADING, payload: false });
    };
    const editProductSave = async (formData) => {
        const boundary =
            "---------------------------" + Date.now().toString(16);
        const config = {
            headers: {
                "Content-Type": `multipart/form-data; boundary=${boundary}`,
                Authorization: `Bearer ${state.userAuth.token}`,
            },
        };
        try {
            const res = await axios.put(`${API_URL}/Product`, formData, config);
            if (res?.data?.status === "success") {
                dispatch({
                    type: EDIT_PRODUCT_SUCCESS,
                });
            }
            console.log(res);
            window.location.href = "/admin";
        } catch (error) {
            dispatch({
                type: EDIT_PRODUCT_FAILED,
                payload: error?.response?.data,
            });
            console.log(error);
        }
    };
    const deleteProductAction = async (id) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearar ${state?.userAuth?.token}`,
            },
        };
        try {
            const res = await axios.delete(`${API_URL}/Product/${id}`, config);
            if (res?.data?.status === "success") {
                dispatch({
                    type: PRODUCT_DELETE_SUCCESS,
                });
            }
            console.log(res);
        } catch (error) {
            dispatch({
                payload: error?.response?.data,
                type: PRODUCT_DELETE_FAILED,
            });
            console.log(error);
        }
    };
    return (
        <productContext.Provider
            value={{
                addProduct,
                deleteProductAction,
                editProductValues,
                editProduct: state?.editProduct,
                editProductSave,
                error: state?.error,
            }}
        >
            {children}
        </productContext.Provider>
    );
};

export default ProductContext;
