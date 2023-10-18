import axios from "axios";
import { useReducer, createContext } from "react";
import { API_URL } from "../../utils/urlUtil";
import {
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAILED,
    REGISTER_SUCCESS,
} from "./AuthContextUtils";

export const authContext = createContext();

const INITIAl_STATE = {
    userAuth: JSON.parse(localStorage.getItem("userAuth")),
    loading: false,
    error: null,
};
const authReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case LOGIN_SUCCESS:
            localStorage.setItem("userAuth", JSON.stringify(payload));
            return {
                ...state,
                userAuth: payload,
                loading: false,
                error: null,
            };
        case LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };
        case REGISTER_FAILED:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case LOGOUT:
            localStorage.removeItem("userAuth");
            return {
                ...state,
                userAuth: null,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};

const AuthContext = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, INITIAl_STATE);

    const loginFormAction = async (form) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.post(`${API_URL}/login`, form, config);
            console.log(res);
            if (res?.data?.status === "success") {
                dispatch({
                    payload: res?.data,
                    type: LOGIN_SUCCESS,
                });
            }
            window.location.href = "/";
        } catch (error) {
            dispatch({
                payload: error.response?.data,
                type: LOGIN_FAILED,
            });
            console.log(error);
        }
    };
    const registerFormAction = async (form) => {
        const boundary =
            "---------------------------" + Date.now().toString(16);
        const config = {
            headers: {
                "Content-Type": `multipart/form-data; boundary=${boundary}`,
            },
        };
        try {
            const res = await axios.post(`${API_URL}/signup`, form, config);
            console.log(res);
            if (res?.data?.status === "success") {
                dispatch({
                    payload: res?.data,
                    type: REGISTER_SUCCESS,
                });
            }
            window.location.href = "/login";
        } catch (error) {
            dispatch({
                payload: error.response?.data,
                type: REGISTER_FAILED,
            });
            console.log(error);
        }
    };
    const logoutUserAction = () => {
        dispatch({
            type: LOGOUT,
        });
        window.location.href = "/";
    };

    return (
        <authContext.Provider
            value={{
                loginFormAction,
                userImage: state?.userAuth?.userImage,
                token: state?.userAuth?.token,
                registerFormAction,
                logoutUserAction,
                error: state.error,
            }}
        >
            {children}
        </authContext.Provider>
    );
};

export default AuthContext;
