import { Link } from "react-router";
import { useAuth } from "../contexts/Auth";

const OrderItem = ({ order }) => {
    const { role } = useAuth();
    const formattedDate = new Date(order?.date).toLocaleDateString();

    return (
        <>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    #{order?.order_number}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    ${order?.order_total}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {order?.status}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {formattedDate}
                </td>
                <td className="px-6 py-4">
                    <Link
                        to={`/order/view/${order?.id}`}
                        className="text-blue-500 hover:underline"
                    >
                        {role &&
                        (role === "admin" ||
                            role === "superadmin" ||
                            role === "super-admin")
                            ? "Update"
                            : "View"}
                    </Link>
                </td>
            </tr>
        </>
    );
};

export default OrderItem;
