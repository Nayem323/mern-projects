import { useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { useCreateOrderMutation } from "../features/api/apiSlice";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/Auth";

export const CheckoutForm = () => {
    const [createOrder] = useCreateOrderMutation();
    const { user } = useAuth();
    const cart = useSelector((state) => state.cart);
    let totalPrice = 0;
    totalPrice = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [addressInput, setAddressInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const items = cart.map((product) => ({
                item_name: product.title,
                quantity: product.quantity,
                price: product.price,
            }));
            const orderData = {
                user_email: emailInput,
                user_id: user.uid,
                date: new Date().toISOString(),
                order_number: Math.floor(Math.random() * 1000000),
                order_total: totalPrice,
                user_name: nameInput,
                shipping_address: addressInput,
                status: "processing",
            };
            const response = await createOrder({ orderData, items });
            if (response.error) {
                toast.error("Failed to create order");
                setLoading(false);
                return;
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Failed to create order");
            setLoading(false);
            return;
        }

        if (elements == null || stripe == null) {
            setLoading(false);
            return;
        }

        const { error: submitError } = await elements.submit();
        if (submitError?.message) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }

        const res = await fetch(`${import.meta.env.VITE_STRIPE_BACKEND_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                currency: "usd",
                amount: totalPrice * 100,
            }),
        });

        const { client_secret: clientSecret } = await res.json();

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${window.location.origin}`,
            },
        });

        if (error) {
            // Show error to your customer
        }

        setLoading(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Your email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="johndoe@mail.com"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Your Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="John Doe"
                        required
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="address"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Shipping Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        value={addressInput}
                        onChange={(e) => setAddressInput(e.target.value)}
                    />
                </div>
                <PaymentElement />
                <button
                    type="submit"
                    className="w-full my-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    disabled={!stripe || !elements}
                >
                    Pay
                </button>
                {errorMessage && <div>{errorMessage}</div>}
            </form>

            {loading && <Loading loadingText="Processing..." />}
        </>
    );
};
