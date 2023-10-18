import React, { useContext } from "react";
import Swal from "sweetalert2";
import { productContext } from "../context/ProductContext/ProductContext";
import { useNavigate } from "react-router-dom";

const Alert = ({ isDelete }) => {
    const { deleteProductAction } = useContext(productContext);
    const navigate = useNavigate();
    const handelDelete = (id) => {
        console.log(id);
        Swal.fire({
            title: "Confirm Delete",
            text: "Are you sure you want to delete this?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProductAction(id);
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
                (function () {
                    navigate("/admin");
                })();
            }
        });
    };
    return (
        <>
            {isDelete && (
                <div
                    className="absolute bottom-5 right-6 hover:scale-125 cursor-pointer"
                    onClick={() => {
                        handelDelete(isDelete);
                    }}
                >
                    <i class="fa-solid fa-trash text-red-500 text-2xl"></i>
                </div>
            )}
        </>
    );
};

export default Alert;
