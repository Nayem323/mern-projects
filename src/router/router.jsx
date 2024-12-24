import { createBrowserRouter } from "react-router";
import Root from "../pages/Root";
import Shop from "../pages/Shop";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";
import ErrorPage from "../pages/ErrorPage";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import NotLoggedInRoute from "../components/NotLoggedInRoute";
import AdminRoute from "../components/AdminRoute";
import PrivateRoute from "../components/PrivateRoute";
import CheckoutRoute from "../components/CheckoutRoute";
import ManageProducts from "../pages/ManageProducts";
import AddProductForm from "../pages/AddProductForm";
import EditProductForm from "../pages/EditProductForm";
import Checkout from "../pages/Checkout";
import MyOrders from "../pages/MyOrders";
import ViewOrder from "../pages/ViewOrder";
import ManageOrders from "../pages/ManageOrders";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <Shop /> },
            {
                path: "/sign-in",
                element: (
                    <NotLoggedInRoute>
                        <Signin />
                    </NotLoggedInRoute>
                ),
            },
            {
                path: "/sign-up",
                element: (
                    <NotLoggedInRoute>
                        <Signup />
                    </NotLoggedInRoute>
                ),
            },
            {
                path: "/manage-products",
                element: (
                    <AdminRoute>
                        <ManageProducts />
                    </AdminRoute>
                ),
            },
            {
                path: "/add-product",
                element: (
                    <AdminRoute>
                        <AddProductForm />
                    </AdminRoute>
                ),
            },
            {
                path: "/edit-product/:id",
                element: (
                    <AdminRoute>
                        <EditProductForm />
                    </AdminRoute>
                ),
            },
            {
                path: "/checkout",
                element: (
                    <CheckoutRoute>
                        <Checkout />
                    </CheckoutRoute>
                ),
            },
            {
                path: "/my-orders",
                element: (
                    <PrivateRoute>
                        <MyOrders />
                    </PrivateRoute>
                ),
            },
            {
                path: "/order/view/:id",
                element: (
                    <PrivateRoute>
                        <ViewOrder />
                    </PrivateRoute>
                ),
            },
            {
                path: "/manage-orders",
                element: (
                    <AdminRoute>
                        <ManageOrders />
                    </AdminRoute>
                ),
            },
            { path: "/products", element: <Products /> },
            { path: "/cart", element: <Cart /> },
            { path: "*", element: <NotFound /> },
        ],
    },
]);
