import React from "react";
import { API_URL } from "../utils/urlUtil";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "./Alert";

const Display = ({ _id, title, price, description, imgPath }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            {/* {!imgPath ? (
                "loading"
            ) : ( */}
            <div className="relative transition-all ease-in duration-100 hover:scale-105">
                {location.pathname === "/admin" && (
                    <>
                        <div>
                            <button
                                className="absolute top-4 right-5 h-7 w-[6.5rem] shadow-xl rounded-lg bg-yellow-400 hover:scale-105 "
                                onClick={() => navigate(`/admin/edit/${_id}`)}
                            >
                                Edit Product
                            </button>
                        </div>
                        <Alert isDelete={_id} />
                    </>
                )}

                <div
                    className="flex flex-col items-start justify-center w-fit m-2 bg-white px-3 border rounded-md shadow-md  "
                    onClick={() => navigate(`/product/${_id}`)}
                >
                    <h2 className="my-1 text-2xl font-semibold">{title}</h2>
                    <div className="mb-1 ">
                        <img
                            className="bg-cover h-[250px] w-[300px] border rounded-md "
                            src={API_URL + "/" + imgPath}
                            alt=""
                        ></img>
                    </div>
                    <h4 className="mb-1 text-xl font-medium">$ {price}</h4>
                    <p className="text-black text-md ">
                        {description.substr(0, 30)}
                    </p>
                </div>
            </div>
            {/* )} */}
        </>
    );
};

export default Display;
