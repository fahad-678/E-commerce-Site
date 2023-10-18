import React, { useContext, useEffect } from "react";

import image from "../assets/img.png";
import bg from "../assets/main-bg.jpg";
import bg1 from "../assets/bg-img.jpg";
import bg2 from "../assets/bg-img1.jpg";
import bg3 from "../assets/bg-img2.jpg";

import Display from "../components/Display";
import ImageSlider from "../components/ImageSlider";
import { localContext } from "../context/LocalContext/LocalContext";

const Dashboard = () => {
    const { dashboardData, dashboard, error } = useContext(localContext);
    useEffect(() => {
        dashboardData();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center w-screen px-4 py-2 ">
            <div className=" flex flex-col justify-center items-center h-full ml-2 w-full bg-[#F5F5F5] rounded-2xl shadow-xl">
                <div className="h-auto w-full mt-4 px-5">
                    <ImageSlider images={dashboard?.products} />
                </div>
                <div className="flex flex-col justify-evenly items-center  w-full">
                    <div className="flex justify-evenly items-center flex-wrap p-1 ">
                        {dashboard?.products?.map((a, index) => {
                            if (index < 8) {
                                return (
                                    <>
                                        <Display
                                            key={a._id}
                                            _id={a._id}
                                            imgPath={a?.imgPath[0]?.path}
                                            title={a?.title}
                                            price={a?.price}
                                            description={a?.description}
                                        />
                                    </>
                                );
                            }
                        })}
                    </div>
                    <div className="h-auto w-full px-5">
                        <ImageSlider images={dashboard?.products} />
                    </div>
                    <div className="flex  justify-evenly items-center flex-wrap p-1   ">
                        {dashboard?.products?.map((a, index) => {
                            if (index > 8) {
                                return (
                                    <>
                                        <Display
                                            key={a._id}
                                            _id={a._id}
                                            imgPath={a?.imgPath[0]?.path}
                                            title={a?.title}
                                            price={a?.price}
                                            description={a?.description}
                                        />
                                    </>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
