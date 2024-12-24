import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "../components/CheckoutForm";

const options = {
    mode: "payment",
    amount: 1050,
    currency: "usd",

    appearance: {
        /*...*/
    },
};

const Checkout = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

    return (
        <div className="container mx-auto mb-20 mt-5">
            <h1 className="text-2xl font-semibold text-gray-900 m-5 text-center">
                Checkout
            </h1>
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
            </Elements>
        </div>
    );
};

export default Checkout;
