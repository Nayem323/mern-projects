import { Navigate } from "react-router";
import { useAuth } from "../contexts/Auth";

export default function NotLoggedInRoute({ children }) {
    const { userLoggedIn } = useAuth();
    return userLoggedIn ? <Navigate to="/" /> : children;
}
