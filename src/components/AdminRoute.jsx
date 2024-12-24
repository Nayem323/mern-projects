import { Navigate } from "react-router";
import { useAuth } from "../contexts/Auth";

export default function AdminRoute({ children }) {
    const { userLoggedIn, role } = useAuth();
    return userLoggedIn &&
        role &&
        (role === "admin" ||
            role === "superadmin" ||
            role === "super-admin") ? (
        children
    ) : (
        <Navigate to="/" />
    );
}
