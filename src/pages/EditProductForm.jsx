import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import {
    useEditProductMutation,
    useGetProductQuery,
} from "../features/api/apiSlice";
import Loading from "../components/Loading";

export default function EditProductForm() {
    const { id } = useParams();
    const {
        data: productData,
        isLoading: getProductLoading,
        refetch,
    } = useGetProductQuery(id);
    const [editProduct, { isLoading }] = useEditProductMutation();
    const [product, setProduct] = useState({
        title: "",
        description: "",
        price: "",
        image: "",
    });
    useEffect(() => {
        setProduct({
            title: productData?.title || "",
            description: productData?.description || "",
            price: productData?.price || "",
            image: productData?.image || "",
        });
    }, [productData]);

    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = async (e) => {
        setUploading(true);
        const file = e.target.files[0];
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "simple-ecommerce");
        data.append("cloud_name", "dobhfcduj");
        const response = await fetch(
            "https://api.cloudinary.com/v1_1/dobhfcduj/image/upload",
            {
                method: "post",
                body: data,
            }
        );
        const image = await response.json();
        setProduct({
            ...product,
            image: image.secure_url,
        });
        setUploading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await editProduct({ id, product });
        refetch();
        toast.success("Product updated successfully");
        navigate("/manage-products");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-0 sm:p-12">
            <div className="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
                <h1 className="text-2xl font-bold mb-8">Edit Product</h1>
                <form onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full mb-5">
                        <input
                            type="text"
                            name="title"
                            placeholder=""
                            required
                            className="pt-1 pb-1 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                            onChange={handleChange}
                            value={product.title}
                        />
                        <label
                            htmlFor="title"
                            className="absolute duration-300 top-1 -z-1 origin-0 text-gray-500"
                        >
                            Product Title
                        </label>
                        <span
                            className="text-sm text-red-600 hidden"
                            id="error"
                        >
                            Title is required
                        </span>
                    </div>
                    <div className="relative z-0 w-full mb-5">
                        <textarea
                            name="description"
                            placeholder=""
                            className="pt-1 pb-1 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                            onChange={handleChange}
                            value={product.description}
                        ></textarea>
                        <label
                            htmlFor="description"
                            className="absolute duration-300 top-1 -z-1 origin-0 text-gray-500"
                        >
                            Product Description
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5">
                        <input
                            type="number"
                            name="price"
                            placeholder=""
                            required
                            className="pt-1 pb-1 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                            onChange={handleChange}
                            value={product.price}
                        />
                        <label
                            htmlFor="price"
                            className="absolute duration-300 top-1 -z-1 origin-0 text-gray-500"
                        >
                            Price
                        </label>
                        <span
                            className="text-sm text-red-600 hidden"
                            id="error"
                        >
                            Price is required
                        </span>
                    </div>
                    <div className="relative z-0 w-full mb-5">
                        {product.image && (
                            <img
                                src={product.image}
                                alt=""
                                className="h-24 w-24"
                            />
                        )}
                        <input
                            type="file"
                            name="image"
                            placeholder=""
                            required={product.image ? false : true}
                            className="pt-1 pb-1 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                            onChange={handleImageChange}
                        />
                        <label
                            htmlFor="image"
                            className="absolute duration-300 top-1 -z-1 origin-0 text-gray-500"
                        >
                            Image
                        </label>

                        <span
                            className="text-sm text-red-600 hidden"
                            id="error"
                        >
                            Image is required
                        </span>
                    </div>

                    {isLoading ? (
                        <p className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-blue-500 hover:bg-blue-600 hover:shadow-lg focus:outline-none text-center">
                            Processing
                        </p>
                    ) : (
                        <button
                            id="button"
                            type="submit"
                            className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-blue-500 hover:bg-blue-600 hover:shadow-lg focus:outline-none"
                        >
                            Update Product
                        </button>
                    )}
                </form>
            </div>

            {(uploading || getProductLoading) && <Loading />}
        </div>
    );
}
