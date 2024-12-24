import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/router";
import { AuthProvider } from "./contexts/Auth";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <Provider store={store}>
                <RouterProvider router={router} />
                <ToastContainer />
            </Provider>
        </AuthProvider>
    </StrictMode>
);
