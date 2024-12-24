import { Navigate } from "react-router";
import { useAuth } from "../contexts/Auth";
import { useSelector } from "react-redux";

export default function PrivateRoute({ children }) {
    const { userLoggedIn } = useAuth();
    const cart = useSelector((state) => state.cart);

    return userLoggedIn && cart.length ? children : <Navigate to="/cart" />;
}
