import { Link } from "react-router";
import {
    useGetProductsQuery,
    useRemoveProductMutation,
} from "../features/api/apiSlice";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

export default function ManageProducts() {
    const { data: products, isLoading } = useGetProductsQuery();
    const [deleteProduct] = useRemoveProductMutation();

    const handleDelete = async (id) => {
        const confirmDelete = confirm(
            "Are you sure you want to delete this product?"
        );
        if (confirmDelete) {
            await deleteProduct(id);
            toast.success("Product deleted successfully");
        }
    };

    return (
        <div className="container mx-auto mb-20 mt-10">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900 m-5">
                    Manage Products
                </h1>
                <Link
                    to="/add-product"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg m-5"
                >
                    Add New Product
                </Link>
            </div>
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-4 font-medium text-gray-900"
                            >
                                Name
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-4 font-medium text-gray-900"
                            >
                                Price
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-4 font-medium text-gray-900"
                            >
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {products?.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                    <div className="text-sm">
                                        <div className="font-medium text-gray-700">
                                            {product.title}
                                        </div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    <span className="text-gray-900">
                                        ${product.price}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <Link
                                        to={`/edit-product/${product.id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="ml-6 text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isLoading && <Loading />}
        </div>
    );
}
