import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthContext from "./context/AuthContext/AuthContext";
import LocalContext from "./context/LocalContext/LocalContext";
import UserContext from "./context/UserContext/UserContext";
import ProductContext from "./context/ProductContext/ProductContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthContext>
        <LocalContext>
            <UserContext>
                <ProductContext>
                    <App />
                </ProductContext>
            </UserContext>
        </LocalContext>
    </AuthContext>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
