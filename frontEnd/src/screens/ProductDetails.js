import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { localContext } from "../context/LocalContext/LocalContext";
import ImageSlider from "../components/ImageSlider";

const ProductDetails = () => {
    const { dashboardDataDetails, details, error } = useContext(localContext);
    const { prodId } = useParams();
    useEffect(() => {
        dashboardDataDetails(prodId);
    }, [prodId]);
    const finalImage = details?.imgPath.concat(details?.previewImage);

    return (
        <div className="py-2 px-6  ">
            <div className="grid grid-cols-[650px_5fr_3fr] grid-rows-4 gap-1 bg-[#F5F5F5] p-2 shadow-xl rounded-lg">
                <div className="row-start-1 row-end-4 col-start-1 col-end-2 shadow-xl rounded-lg">
                    <ImageSlider images={finalImage} details={true} />
                </div>
                <div className="row-start-1 row-end-2 col-start-2 col-end-3 p-2 shadow-xl rounded-lg">
                    <p className="text-xl font-semibold">{details?.title}</p>
                </div>
                <div className=" row-start-2 row-end-3 col-start-2 col-end-3 p-2 shadow-xl rounded-lg">
                    <p className="text-xl font-semibold">${details?.price}</p>
                </div>
                <div className="flex justify-center items-end row-start-1 row-end-4 col-start-3 col-end-4 p-2 shadow-xl rounded-lg">
                    <div className="flex flex-col mb-6">
                        <button className="h-8 w-28 mb-3 shadow-xl rounded-lg bg-yellow-400">
                            Add to Cart
                        </button>
                    
                    </div>
                </div>
                <div className="row-start-3 row-end-4 col-start-2 col-end-3 p-2 shadow-xl rounded-lg">
                    <p className="">{details?.description}</p>
                </div>
                <div className="row-start-4 row-end-5 col-start-1 col-end-4 p-2 shadow-xl rounded-lg">
                    <p>Reviews</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
