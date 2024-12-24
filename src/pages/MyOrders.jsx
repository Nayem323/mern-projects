import Loading from "../components/Loading";
import { useGetUserOrdersQuery } from "../features/api/apiSlice";
import OrderItem from "../components/OrderItem";
import { useAuth } from "../contexts/Auth";

export default function MyOrders() {
    const { user } = useAuth();
    const {
        data: orders,
        isLoading,
        isError,
        error,
    } = useGetUserOrdersQuery(user.uid);
    return (
        <div className="container mx-auto mb-20 mt-10">
            <h1 className="text-2xl font-semibold text-gray-900 m-5 text-center">
                My Orders
            </h1>
            {orders && (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Order#
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Amount
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.map((order) => (
                                <OrderItem key={order.id} order={order} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {isError && (
                <div className="text-center p-10">
                    <h2 className="text-2xl font-semibold text-gray-900 m-5">
                        {error}
                    </h2>
                </div>
            )}
            {isLoading && <Loading />}
        </div>
    );
}
