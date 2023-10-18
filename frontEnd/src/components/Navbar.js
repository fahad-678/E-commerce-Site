import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { authContext } from "../context/AuthContext/AuthContext";
import { API_URL } from "../utils/urlUtil";

const Navbar = () => {
    const { logoutUserAction, token, userImage } = useContext(authContext);
    console.log(userImage);
    return (
        <div className="flex justify-center items-center w-full px-2 ">
            <nav className="flex justify-center items-center w-full bg-[#FBC40E] border rounded-lg shadow-lg ml-3 mt-2 h-20 overflow-hidden">
                <div className="flex w-1/2 justify-start items-center ">
                    <div className="flex items-center justify-center h-18 w-16 p-1 ml-1">
                        <img
                            className="border border-white rounded-[30px]"
                            src={logo}
                            alt=""
                        />
                    </div>
                    <Link
                        className="ml-6 text-lg font-medium hover:scale-105"
                        to="/"
                    >
                        DashBoard
                    </Link>
                    {token && (
                        <>
                            <Link
                                className="ml-6 text-lg font-medium hover:scale-105"
                                to="/admin"
                            >
                                Admin
                            </Link>
                            <Link
                                className="ml-6 text-lg font-medium hover:scale-105"
                                to="/cart"
                            >
                                Cart
                            </Link>
                            <Link
                                className="ml-6 text-lg font-medium hover:scale-105"
                                to="/admin/add-product"
                            >
                                Add Product
                            </Link>
                        </>
                    )}
                </div>
                <div className="flex w-1/2 justify-end items-center">
                    {!token && (
                        <>
                            <Link
                                className="mr-6 text-lg font-medium hover:scale-105"
                                to="/login"
                            >
                                LogIn
                            </Link>
                            <Link
                                className="mr-6 text-lg font-medium hover:scale-105"
                                to="/register"
                            >
                                Register
                            </Link>
                        </>
                    )}
                    {token && (
                        <>
                            <button
                                className="mr-6 text-lg font-medium hover:scale-105"
                                onClick={logoutUserAction}
                            >
                                LogOut
                            </button>
                        </>
                    )}
                    <div className="flex justify-center items-center ">
                        <Link className="" to={token ? "/profile" : "/login"}>
                            <div className="flex items-center justify-center  p-1 mr-1">
                                <img
                                    className="shadow-lg bg-cover h-[4rem] w-[4rem] rounded-[30px] border-white  hover:scale-105"
                                    src={
                                        userImage
                                            ? API_URL + "/" + userImage[0].path
                                            : logo
                                    }
                                    alt=""
                                />
                            </div>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
