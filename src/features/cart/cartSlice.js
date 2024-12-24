import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart(state, action) {
            const product = state.find((item) => item.id === action.payload.id);

            product
                ? product.quantity++
                : state.push({ ...action.payload, quantity: 1 });
            toast.success("Product added to cart");
        },
        removeItem(state, action) {
            toast.warning("Product removed from cart");
            return state.filter((item) => item.id !== action.payload);
        },
        modifyQuantity(state, action) {
            const product = state.find((item) => item.id === action.payload.id);

            product.quantity = action.payload.quantity;
            toast.success("Product quantity updated");
        },
        clearCart() {
            toast.success("Cart cleared");
            return [];
        },
    },
});

export const { addToCart, removeItem, modifyQuantity, clearCart } =
    cartSlice.actions;

export default cartSlice;
