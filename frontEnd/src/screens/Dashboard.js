import React, { useContext, useEffect } from "react";
import { API_URL } from "../utils/urlUtil";

import Display from "../components/Display";
import ImageSlider from "../components/ImageSlider";
import { localContext } from "../context/LocalContext/LocalContext";

const Dashboard = () => {
    const { dashboardData, dashboard, error } = useContext(localContext);

    useEffect(() => {
        dashboardData();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center w-screen px-4 py-2">
            <div className="flex flex-col justify-center items-center h-full ml-2 w-full bg-[#F5F5F5] rounded-2xl shadow-xl">
                <div className="h-auto w-full mt-4 px-5">
                    <ImageSlider images={dashboard?.products} />
                </div>
                <div className="flex flex-col justify-evenly items-center w-full">
                    <div className="flex justify-evenly items-center flex-wrap p-1">
                        {dashboard?.products?.slice(0, 8).map((product) => (
                            <Display
                                key={product._id}
                                _id={product._id}
                                imgPath={product?.imgPath[0]?.path}
                                title={product?.title}
                                price={product?.price}
                                description={product?.description}
                            />
                        ))}
                    </div>
                    <div className="h-auto w-full px-5">
                        <ImageSlider images={dashboard?.products} />
                    </div>
                    <div className="flex justify-evenly items-center flex-wrap p-1">
                        {dashboard?.products?.slice(8).map((product) => (
                            <Display
                                key={product._id}
                                _id={product._id}
                                imgPath={product?.imgPath[0]?.path}
                                title={product?.title}
                                price={product?.price}
                                description={product?.description}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
