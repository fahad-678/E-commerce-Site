import * as Yup from "yup";

const maxFileSize = 10240000;
const allowedExtensions = /\.(jpg|jpeg|png|gif)$/i;

const imageSchema = Yup.mixed()
    .test("fileType", "Invalid File Format", (value) => {
        return value && allowedExtensions.test(value.name);
    })
    .test("fileSize", "File Size is too large", (value) => {
        return value && value.size <= maxFileSize;
    });

export const productValidation = Yup.object().shape({
    title: Yup.string("Please Enter a Valid Title")
        .min(3, "Must be at least 3 character")
        .max(100, "Should be less than 100 character")
        .required("Required"),
    previewImage: imageSchema.required("Main Image is required"),
    image: Yup.array()
        .of(imageSchema)
        .min(1, "At Least One Image Is Required")
        .max(10, "You can upload a maximum of 10 Images")
        .required("At least one image is required"),
    price: Yup.number("Please Enter a Valid Price")
        .positive("Please Enter a Valid Price")
        .integer("Please Enter a Valid Price")
        .required("Required"),
    description: Yup.string("Please Enter a Valid Description")
        .min(3, "Must be at least 3 character")
        .max(500, "Should be less than 500 character")
        .required("Required"),
    quantity: Yup.number("Please Enter a Valid Quantity")
        .positive("Please Enter a Valid Quantity")
        .integer("Please Enter a Valid Quantity")
        .required("Required"),
});
