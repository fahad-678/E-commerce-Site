import React, { createContext, useReducer, useEffect } from "react";
import { API_URL } from "../../utils/urlUtil";
import openSocket from "socket.io-client";
import axios from "axios";

import {
    DATA_FETCH_FAILED,
    DATA_FETCH_SUCCESS,
    DETAILS_FETCH_FAILED,
    DETAILS_FETCH_SUCCESS,
    PRODUCT_CREATE,
    PRODUCT_UPDATE,
    PRODUCT_DELETE,
} from "./LocalContextUtils";

export const localContext = createContext();

const INITIAL_STATE = {
    dashboard: null,
    details: null,
    loading: false,
    error: null,
};

const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case DATA_FETCH_SUCCESS:
            return {
                ...state,
                dashboard: payload,
                loading: false,
                error: null,
            };
        case DATA_FETCH_FAILED:
            return {
                ...state,
                dashboard: null,
                loading: false,
                error: payload,
            };
        case DETAILS_FETCH_SUCCESS:
            return {
                ...state,
                details: payload,
                loading: false,
                error: null,
            };
        case DETAILS_FETCH_FAILED:
            return {
                ...state,
                details: null,
                loading: false,
                error: payload,
            };
        case PRODUCT_CREATE:
            return {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    products: [...state.dashboard.products, payload],
                },
            };
        case PRODUCT_UPDATE:
            return {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    products: state.dashboard.products.map(product =>
                        product._id === payload._id ? payload : product
                    ),
                },
            };
        case PRODUCT_DELETE:
            return {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    products: state.dashboard.products.filter(
                        product => product._id !== payload
                    ),
                },
            };
        default:
            return state;
    }
};

const LocalContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const dashboardData = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.get(`${API_URL}/`, config);
            if (res?.data?.status === "success") {
                dispatch({
                    type: DATA_FETCH_SUCCESS,
                    payload: res?.data,
                });
            }
        } catch (error) {
            dispatch({
                type: DATA_FETCH_FAILED,
                payload: error?.response?.data,
            });
        }
    };

    const dashboardDataDetails = async (id) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.post(`${API_URL}/${id}`, config);
            if (res?.data?.status === "success") {
                dispatch({
                    type: DETAILS_FETCH_SUCCESS,
                    payload: res?.data?.product,
                });
            }
        } catch (error) {
            dispatch({
                type: DETAILS_FETCH_FAILED,
                payload: error?.response?.data,
            });
        }
    };

    useEffect(() => {
        const socket = openSocket(API_URL, {
            withCredentials: true,
        });

        socket.on("connect", () => {
            console.log("Connected to WebSocket server");
        });

        socket.on("post", (data) => {
            if (data.action === "create") {
                dispatch({
                    type: PRODUCT_CREATE,
                    payload: data.post,
                });
            } else if (data.action === "edit") {
                dispatch({
                    type: PRODUCT_UPDATE,
                    payload: data.post,
                });
            } else if (data.action === "delete") {
                dispatch({
                    type: PRODUCT_DELETE,
                    payload: data.postId,
                });
            }
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <localContext.Provider
            value={{
                dashboardData,
                dashboard: state?.dashboard,
                dashboardDataDetails,
                details: state?.details,
                error: state?.error,
            }}
        >
            {children}
        </localContext.Provider>
    );
};

export default LocalContext;
