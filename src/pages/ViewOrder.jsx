import { useParams } from "react-router";
import Loading from "../components/Loading";
import {
    useGetOrderQuery,
    useGetOrderItemsQuery,
    useUpdateOrderStatusMutation,
} from "../features/api/apiSlice";
import { useAuth } from "../contexts/Auth";
import { toast } from "react-toastify";

export default function ViewOrder() {
    const { id } = useParams();
    const {
        data: order,
        isLoading,
        isError,
        error,
        refetch,
    } = useGetOrderQuery(id);
    const {
        data: items,
        isError: isItemError,
        error: itemError,
    } = useGetOrderItemsQuery(id);
    const [updateOrderStatus, { isLoading: isUpdating }] =
        useUpdateOrderStatusMutation();
    const formattedDate = new Date(order?.date).toLocaleDateString();
    const { role } = useAuth();

    const handleStatusChange = async (e) => {
        const response = await updateOrderStatus({
            id: order.id,
            status: e.target.value,
        });
        if (response.data.isSuccess) {
            toast.success("Order status updated successfully");
            refetch();
        } else {
            toast.error("Failed to update order status");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen py-10">
            {isError && (
                <div className="text-center p-10">
                    <h2 className="text-2xl font-semibold text-gray-900 m-5">
                        {error}
                    </h2>
                </div>
            )}
            {order && (
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                        Order Details
                    </h1>

                    <div className="space-y-4">
                        {/* Order Info */}
                        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                            <h2 className="text-lg font-medium text-gray-700">
                                Order Information
                            </h2>
                            <div className="mt-2 grid grid-cols-2 gap-4">
                                <p>
                                    <span className="font-semibold">
                                        Order:
                                    </span>{" "}
                                    #{order?.order_number}
                                </p>
                                <p>
                                    <span className="font-semibold">Date:</span>{" "}
                                    {formattedDate}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Status:
                                    </span>{" "}
                                    {role &&
                                    (role === "admin" ||
                                        role === "superadmin" ||
                                        role === "super-admin") ? (
                                        <>
                                            <span className="inline-block px-2 py-2 rounded-full text-sm bg-gray-900 text-white">
                                                <select
                                                    className=" bg-gray-900 focus:outline-none text-white"
                                                    name="status"
                                                    id="status"
                                                    value={order?.status}
                                                    onChange={(e) =>
                                                        handleStatusChange(e)
                                                    }
                                                >
                                                    <option value="processing">
                                                        Processing
                                                    </option>
                                                    <option value="completed">
                                                        Completed
                                                    </option>
                                                </select>
                                            </span>
                                        </>
                                    ) : (
                                        <span
                                            className={`inline-block px-2 py-1 rounded-full text-sm ${
                                                order?.status === "completed"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            {order?.status}
                                        </span>
                                    )}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Total:
                                    </span>{" "}
                                    ${order?.order_total}
                                </p>
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                            <h2 className="text-lg font-medium text-gray-700">
                                Customer Details
                            </h2>
                            <div className="mt-2">
                                <p>
                                    <span className="font-semibold">Name:</span>{" "}
                                    {order?.user_name}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Email:
                                    </span>{" "}
                                    {order?.user_email}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Address:
                                    </span>{" "}
                                    {order?.shipping_address}
                                </p>
                            </div>
                        </div>

                        {/* Items */}
                        {isItemError && (
                            <div className="text-center p-10">
                                <h2 className="text-xl font-semibold text-gray-900 m-5">
                                    {itemError}
                                </h2>
                            </div>
                        )}
                        {items && (
                            <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                                <h2 className="text-lg font-medium text-gray-700">
                                    Items
                                </h2>
                                <table className="w-full mt-2 border-collapse border border-gray-200">
                                    <thead>
                                        <tr className="bg-gray-100 text-left">
                                            <th className="border border-gray-200 px-4 py-2">
                                                Item
                                            </th>
                                            <th className="border border-gray-200 px-4 py-2">
                                                Quantity
                                            </th>
                                            <th className="border border-gray-200 px-4 py-2">
                                                Price
                                            </th>
                                            <th className="border border-gray-200 px-4 py-2">
                                                Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item) => (
                                            <tr
                                                key={item.id}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="border border-gray-200 px-4 py-2">
                                                    {item.item_name}
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2">
                                                    {item.quantity}
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2">
                                                    ${item.price}
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2">
                                                    $
                                                    {item.price * item.quantity}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td
                                                colSpan="3"
                                                className="border border-gray-200 px-4 py-2 text-center"
                                            >
                                                Total
                                            </td>
                                            <td className="border border-gray-200 px-4 py-2">
                                                ${order?.order_total}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {(isLoading || isUpdating) && <Loading />}
        </div>
    );
}
