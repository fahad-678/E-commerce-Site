import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import { productValidation } from "../schema/ValidationSchema";
import { productContext } from "../context/ProductContext/ProductContext";
import { useParams } from "react-router-dom";

const EditProduct = () => {
    const { editProductValues, editProductSave, editProduct } =
        useContext(productContext);
    const onSubmit = (values, actions) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("previewImage", values.previewImage);
        values.image.forEach((element) => {
            formData.append("image", element);
        });
        console.log(values.image);
        formData.append("price", values.price);
        formData.append("description", values.description);
        formData.append("quantity", values.quantity);
        editProductSave(formData);
    };
    const { prodId } = useParams();

    const {
        values,
        handleChange,
        handleBlur,
        errors,
        handleSubmit,
        setFieldValue,
        touched,
        setValues,
    } = useFormik({
        initialValues: {
            title: editProduct?.title || "",
            previewImage: null,
            image: [],
            price: editProduct?.price || "",
            description: editProduct?.description || "",
            quantity: editProduct?.quantity || "",
        },
        validationSchema: productValidation,
        onSubmit,
    });
    useEffect(() => {
        editProductValues(prodId);
    }, []);
    editProduct ? setValues({
        ...values,
        title: editProduct?.title || "",
        price: editProduct?.price || "",
        description: editProduct?.description || "",
        quantity: editProduct?.quantity || "",
    }): 

    console.log(editProduct);
    // useEffect(() => {
    //     editProductValues(prodId).then((value) => {
    //         setValues({
    //             ...values,
    //             title: value?.title,
    //             price: value?.price,
    //             description: value?.description,
    //             quantity: value?.quantity,
    //         });
    //     });
    // }, []);
    const inputClassNameTitle = `bg-transparent p-2 placeholder:text-slate-700 border-2 rounded-md resize-none w-[16rem] ${
        errors.title && touched.title && "border-red-500 "
    }`;
    const inputClassNamePrice = `bg-transparent p-2 placeholder:text-slate-700 border-2 rounded-md resize-none w-[16rem] ${
        errors.price && touched.price && "border-red-500 "
    }`;
    const inputClassNameDescription = `bg-transparent p-2 placeholder:text-slate-700 border-2 rounded-md resize-none w-[16rem] ${
        errors.description && touched.description && "border-red-500 "
    }`;
    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <div className="flex justify-center items-center bg-slate-500 h-[80%] w-[35%] shadow-lg     rounded-lg min-h-fit">
                <form
                    className="flex flex-col justify-center items-center "
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >
                    <div className="flex justify-start items-center bg-yellow-500 rounded-md shadow-md mt-4 ">
                        <textarea
                            type="text"
                            name="title"
                            className={inputClassNameTitle}
                            placeholder="Title"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    {errors.title && touched.title && (
                        <p className="text-red-600  ">{errors.title}</p>
                    )}

                    <div
                        className="flex justify-start items-center bg-yellow-500 rounded-md shadow-md mt-4
                     transition-all ease-in duration-100 hover:-translate-y-1 hover:cursor-pointer hover:scale-105"
                    >
                        <label
                            htmlFor="previewImage"
                            className="bg-transparent p-2 w-[16rem]"
                        >
                            <p className="text-start text-black">
                                Upload Main Image
                            </p>
                        </label>
                        <input
                            id="previewImage"
                            type="file"
                            name="previewImage"
                            className="hidden"
                            onChange={(e) =>
                                setFieldValue("previewImage", e.target.files[0])
                            }
                            onBlur={handleBlur}
                        />
                    </div>
                    {errors.previewImage && touched.previewImage && (
                        <p className="text-red-600 ">{errors.previewImage}</p>
                    )}
                    <div className="flex justify-start items-center bg-yellow-500 rounded-md shadow-md mt-4 transition-all ease-in duration-100 hover:-translate-y-1 hover:cursor-pointer hover:scale-105">
                        <label
                            htmlFor="image"
                            className="bg-transparent p-2 w-[16rem]"
                        >
                            <p className="text-start text-black">
                                Upload Preview Image
                            </p>
                        </label>
                        <input
                            id="image"
                            type="file"
                            name="image"
                            className="hidden"
                            multiple
                            onChange={(e) => {
                                const selectedImages = Array.from(
                                    e.target.files
                                );
                                setFieldValue("image", selectedImages);
                            }}
                            onBlur={handleBlur}
                        />
                    </div>
                    {errors.image && touched.image && (
                        <p className="text-red-600 ">{errors.image}</p>
                    )}
                    <div className="flex justify-start items-center bg-yellow-500 rounded-md shadow-md mt-4 ">
                        <input
                            type="text"
                            name="price"
                            className={inputClassNamePrice}
                            placeholder="Price"
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    {errors.price && touched.price && (
                        <p className="text-red-600 ">{errors.price}</p>
                    )}
                    <div className="flex justify-start items-center bg-yellow-500 rounded-md shadow-md mt-4">
                        <textarea
                            name="description"
                            className={inputClassNameDescription}
                            placeholder="Description"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    {errors.description && touched.description && (
                        <p className="text-red-600 ">{errors.description}</p>
                    )}
                    <div className="flex justify-start items-center bg-yellow-500 rounded-md shadow-md mt-4">
                        <input
                            type="text"
                            name="quantity"
                            className={inputClassNamePrice}
                            inputMode="none"
                            placeholder="Quantity"
                            value={values.quantity}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    {errors.quantity && touched.quantity && (
                        <p className="text-red-600 ">{errors.quantity}</p>
                    )}
                    <button
                        type="submit"
                        className="self-end bg-yellow-600 rounded-md shadow-md p-2 transition-all ease-in duration-100 hover:scale-105 mt-4"
                    >
                        Edit Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
