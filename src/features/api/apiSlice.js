import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import { db } from "../../firebase";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fakeBaseQuery,
    tagTypes: ["products", "product", "orders", "order"],
    endpoints: (builder) => ({
        getProducts: builder.query({
            async queryFn() {
                try {
                    const productsCollectionRef = collection(db, "products");
                    const snapshot = await getDocs(productsCollectionRef);
                    const filteredProducts = snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }));
                    return { data: filteredProducts };
                } catch (error) {
                    console.log(error.message);
                    return { error: "Failed to fetch products" };
                }
            },
            providesTags: ["products"],
        }),

        getProduct: builder.query({
            queryFn: async (id) => {
                try {
                    const docRef = doc(db, "products", id);
                    const docSnap = await getDoc(docRef);
                    return { data: { id: docSnap.id, ...docSnap.data() } };
                } catch (error) {
                    console.log(error.message);
                    return { error: "Failed to fetch product" };
                }
            },
            providesTags: (result, error, id) => [{ type: "product", id }],
        }),

        addProduct: builder.mutation({
            queryFn: async (product) => {
                try {
                    await addDoc(collection(db, "products"), product);
                    return { data: product };
                } catch (error) {
                    console.log(error.message);
                    return { error: "Failed to add product" };
                }
            },
            invalidatesTags: ["products"],
        }),

        editProduct: builder.mutation({
            queryFn: async ({ id, product }) => {
                try {
                    await setDoc(doc(db, "products", id), product);
                    return { data: product };
                } catch (error) {
                    console.log(error.message);
                    return { error: "Failed to update product" };
                }
            },
            invalidatesTags: (result, error, id) => [
                { type: "products" },
                { type: "product", id },
            ],
        }),

        removeProduct: builder.mutation({
            queryFn: async (id) => {
                try {
                    await deleteDoc(doc(db, "products", id));
                    return { data: id };
                } catch (error) {
                    return { error };
                }
            },
            invalidatesTags: ["products"],
        }),

        getAllOrders: builder.query({
            async queryFn() {
                try {
                    const ordersCollectionRef = collection(db, "orders");
                    const snapshot = await getDocs(ordersCollectionRef);
                    const filteredOrders = snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }));
                    return { data: filteredOrders };
                } catch (error) {
                    console.log(error.message);
                    return { error: "Failed to fetch orders", isError: true };
                }
            },
            providesTags: ["orders"],
        }),

        getUserOrders: builder.query({
            queryFn: async (user_id) => {
                try {
                    const docRef = collection(db, "orders");
                    const q = query(docRef, where("user_id", "==", user_id));
                    const docSnap = await getDocs(q);
                    const orders = docSnap.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                    if (!orders.length) {
                        return {
                            error: "You don't have any orders yet",
                            isError: true,
                            data: null,
                        };
                    }

                    return { data: orders };
                } catch (error) {
                    console.log(error.message);
                    return { error: "Failed to fetch orders", isError: true };
                }
            },
            providesTags: ["orders"],
        }),

        getOrder: builder.query({
            queryFn: async (id) => {
                try {
                    const docRef = doc(db, "orders", id);
                    const docSnap = await getDoc(docRef);
                    if (!docSnap.exists()) {
                        return {
                            error: "Order not found",
                            isError: true,
                            data: null,
                        };
                    }
                    return { data: { id: docSnap.id, ...docSnap.data() } };
                } catch (error) {
                    console.log(error.message);
                    return { error: "Failed to fetch order", isError: true };
                }
            },
            providesTags: (result, error, id) => [{ type: "order", id }],
        }),

        createOrder: builder.mutation({
            queryFn: async ({ orderData, items }) => {
                try {
                    const response = await addDoc(
                        collection(db, "orders"),
                        orderData
                    );
                    items.forEach(async (item) => {
                        await addDoc(collection(db, "order_items"), {
                            order_id: response.id,
                            ...item,
                        });
                    });
                    return { data: orderData };
                } catch (error) {
                    console.log(error.message);
                    return { error: "Failed to create order", isError: true };
                }
            },
            invalidatesTags: ["orders"],
        }),

        updateOrderStatus: builder.mutation({
            queryFn: async ({ id, status }) => {
                try {
                    await setDoc(
                        doc(db, "orders", id),
                        { status },
                        { merge: true }
                    );
                    return { data: { isSuccess: true } };
                } catch (error) {
                    console.log(error.message);
                    return { error: "Failed to Update order", isError: true };
                }
            },
            invalidatesTags: (result, error, id) => [
                { type: "orders" },
                { type: "order", id },
            ],
        }),

        getOrderItems: builder.query({
            queryFn: async (order_id) => {
                try {
                    const docRef = collection(db, "order_items");
                    const q = query(docRef, where("order_id", "==", order_id));
                    const docSnap = await getDocs(q);
                    const items = docSnap.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    if (!items.length) {
                        return {
                            error: "No items data found",
                            isError: true,
                            data: null,
                        };
                    }
                    return { data: items };
                } catch (error) {
                    console.log(error.message);
                    return {
                        error: "Failed to fetch order items",
                        isError: true,
                    };
                }
            },
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useAddProductMutation,
    useEditProductMutation,
    useRemoveProductMutation,
    useGetAllOrdersQuery,
    useGetUserOrdersQuery,
    useCreateOrderMutation,
    useUpdateOrderStatusMutation,
    useGetOrderQuery,
    useGetOrderItemsQuery,
} = apiSlice;
