import { Navigate } from "react-router";
import { useAuth } from "../contexts/Auth";

export default function PrivateRoute({ children }) {
    const { userLoggedIn } = useAuth();
    return userLoggedIn ? children : <Navigate to="/sign-in" />;
}
