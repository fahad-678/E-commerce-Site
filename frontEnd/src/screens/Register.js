import React, { useContext, useState } from "react";
import { authContext } from "../context/AuthContext/AuthContext";

export const Register = () => {
    const { registerFormAction } = useContext(authContext);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        image: null,
        phNumber: "",
        address: "",
    });
    const { name, email, password, phNumber, address, image } = form;
    const onInputChange = (e) => {
        return setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const onImageChange = (e) => {
        return setForm({
            ...form,
            image: e.target.files[0],
        });
    };
    const onFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (image && email && password) {
            formData.append("profileImage", image);
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("phNumber", phNumber);
            formData.append("address", address);
        } else {
            return alert("Please fill right info");
        }
        console.log(formData);
        registerFormAction(formData);
    };
    return (
        <div className="flex justify-center items-center h-screen w-screen  px-4 py-2">
            <div className="flex justify-center items-center bg-[#e1e0da] w-full h-full rounded-xl ml-2 shadow-2xl ">
                <div className="flex justify-center items-center mb-[100px] bg-transparent ">
                    <form className="flex flex-col " onSubmit={onFormSubmit}>
                        <div className="flex justify-center items-center mb-5  bg-[#343F71]  rounded-xl">
                            <i className="fa-regular fa-user text-lg m-2"></i>
                            <input
                                className=" bg-transparent px-3 w-[250px] h-11 rounded-lg "
                                onChange={onInputChange}
                                value={name}
                                name="name"
                                type="text"
                                placeholder="Huzaifa"
                            />
                        </div>
                        <div className="flex justify-center items-center mb-4  bg-[#343F71] rounded-xl">
                            <i className="fa-regular fa-envelope text-lg m-2"></i>
                            <input
                                className=" bg-transparent px-3 w-[250px] h-11 rounded-lg focus:bg-transparent "
                                onChange={onInputChange}
                                name="email"
                                value={email}
                                id="email"
                                type="email"
                                placeholder="name@email.com"
                            />
                        </div>
                        <div className="flex justify-center items-center mb-4 bg-[#343F71] rounded-xl">
                            <i className="fa-solid fa-key text-lg m-2"></i>
                            <input
                                className="h-11 px-3 bg-transparent w-[250px] rounded-lg "
                                onChange={onInputChange}
                                value={password}
                                name="password"
                                type="password"
                                placeholder="*****"
                            />
                        </div>
                        <div className="flex justify-center items-center  mb-4 bg-[#343F71] rounded-xl">
                            <i class="fa-solid fa-file-image"></i>
                            <label
                                htmlFor="pImg"
                                className="flex justify-start items-center h-11 px-3 bg-transparent w-[250px] rounded-lg cursor-pointer"
                            >
                                <p>Upload Pic</p>
                            </label>
                            <input
                                className="hidden"
                                id="pImg"
                                onChange={onImageChange}
                                // value={image}
                                name="image"
                                type="file"
                            />
                        </div>
                        <div className="flex justify-center items-center mb-4 bg-[#343F71] rounded-xl">
                            <i class="fa-solid fa-phone"></i>
                            <input
                                className="h-11 px-3 bg-transparent w-[250px] rounded-lg "
                                onChange={onInputChange}
                                value={phNumber}
                                name="phNumber"
                                type="tel"
                                placeholder="0123456789"
                            />
                        </div>
                        <div className="flex justify-center items-center mb-4 bg-[#343F71] rounded-xl focus:bg-transparent">
                            <i class="fa-solid fa-location-dot"></i>
                            <input
                                className="h-11 px-3 bg-transparent w-[250px] rounded-lg "
                                onChange={onInputChange}
                                value={address}
                                name="address"
                                type="text"
                                placeholder="Street ABC"
                            />
                        </div>
                        <button
                            className="bg-[#343F71] w-20 h-8 mt-4 self-end rounded-lg text-lg"
                            type="submit"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
