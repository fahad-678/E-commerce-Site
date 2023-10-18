import React, { useContext, useEffect } from "react";
import Display from "../components/Display";

import { userContext } from "../context/UserContext/UserContext";

const Admin = () => {
    const { adminProducts, product } = useContext(userContext);
    console.log(product);
    useEffect(() => {
        adminProducts();
    }, []);
    return (
        <div className="flex flex-col justify-center items-center w-screen px-4 py-2 ">
            <div className=" flex flex-col justify-center items-center h-full ml-2 w-full bg-[#F5F5F5] rounded-2xl shadow-xl">
                <div className="flex justify-evenly items-center flex-wrap p-1 ">
                    {product?.products?.map((a, index) => {
                        return (
                            <>
                                <Display
                                    _id={a._id}
                                    imgPath={a?.imgPath[0]?.path}
                                    title={a?.title}
                                    price={a?.price}
                                    description={a?.description}
                                />
                            </>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Admin;
