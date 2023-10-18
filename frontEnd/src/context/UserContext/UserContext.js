import axios from "axios";
import React, { createContext, useReducer } from "react";
import { API_URL } from "../../utils/urlUtil";
import {
    ADMIN_PRODUCTS_DELETE_FAILED,
    ADMIN_PRODUCTS_DELETE_SUCCESS,
    ADMIN_PRODUCTS_FETCH_FAILED,
    ADMIN_PRODUCTS_FETCH_SUCCESS,
} from "./UserContextUtils";

export const userContext = createContext();

const INITIAL_STATE = {
    userAuth: JSON.parse(localStorage.getItem("userAuth")),
    profile: null,
    product: null,
    loading: false,
    error: null,
};

const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case ADMIN_PRODUCTS_FETCH_SUCCESS:
            return {
                ...state,
                product: payload,
                loading: false,
                error: null,
            };
        case ADMIN_PRODUCTS_FETCH_FAILED:
            return {
                ...state,
                product: null,
                loading: false,
                error: payload,
            };
        case ADMIN_PRODUCTS_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };
        case ADMIN_PRODUCTS_DELETE_FAILED:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
};

const UserContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const adminProducts = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearar ${state?.userAuth?.token}`,
            },
        };
        try {
            const res = await axios.get(`${API_URL}/Product`, config);
            if (res?.data?.status === "success") {
                dispatch({
                    payload: res?.data,
                    type: ADMIN_PRODUCTS_FETCH_SUCCESS,
                });
            }
            console.log(res);
        } catch (error) {
            dispatch({
                payload: error?.response?.data,
                type: ADMIN_PRODUCTS_FETCH_FAILED,
            });
            console.log(error);
        }
    };

    return (
        <userContext.Provider
            value={{
                adminProducts,
                product: state?.product,
                error: state?.error,
            }}
        >
            {children}
        </userContext.Provider>
    );
};

export default UserContext;
