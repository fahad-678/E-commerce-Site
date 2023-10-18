import React, { createContext, useReducer } from "react";
import { API_URL } from "../../utils/urlUtil";

import {
    DATA_FETCH_FAILED,
    DATA_FETCH_SUCCESS,
    DETAILS_FETCH_FAILED,
    DETAILS_FETCH_SUCCESS,
} from "./LocalContextUtils";
import axios from "axios";

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
            console.log(res);
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
            console.log(res);
        } catch (error) {
            dispatch({
                type: DETAILS_FETCH_FAILED,
                payload: error?.response?.data,
            });
        }
    };

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
