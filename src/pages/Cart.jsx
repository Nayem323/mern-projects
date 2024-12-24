import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem";
import { clearCart } from "../features/cart/cartSlice";
import { Link } from "react-router";
import { useAuth } from "../contexts/Auth";

export default function Cart() {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const { userLoggedIn } = useAuth();
    return (
        <div className="container mx-auto mb-20 mt-10">
            <h1 className="text-2xl font-semibold text-gray-900 m-5 text-center">
                Shopping Cart
            </h1>
            {cart.length === 0 && (
                <div className="text-center p-10">
                    <h2 className="text-2xl font-semibold text-gray-900 m-5">
                        Your cart is empty
                    </h2>
                </div>
            )}
            {cart.length > 0 && (
                <>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-16 py-3">
                                        <span className="sr-only">Image</span>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Product
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Qty
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Subtotal
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((product) => (
                                    <CartItem
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </tbody>
                            <tfoot className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white font-bold">
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-6 py-4 text-right"
                                    >
                                        Total
                                    </td>
                                    <td className="px-6 py-4">
                                        $
                                        {cart.reduce(
                                            (acc, item) =>
                                                acc +
                                                item.price * item.quantity,
                                            0
                                        )}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className="flex justify-between items-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-10 rounded-lg my-5"
                            onClick={() => dispatch(clearCart())}
                        >
                            Clear Cart
                        </button>
                        <div className="flex items-center flex-col">
                            {!userLoggedIn ? (
                                <>
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-10 rounded-lg mt-5 mb-2">
                                        Go to Checkout
                                    </button>
                                    <p className="text-xs font-semibold text-gray-900">
                                        (Please login to continue)
                                    </p>
                                </>
                            ) : (
                                <Link
                                    to="/checkout"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-10 rounded-lg mt-5 mb-2"
                                >
                                    Go to Checkout
                                </Link>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
