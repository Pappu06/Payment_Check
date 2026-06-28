import axios from "axios";

const API = axios.create({
    baseURL: "https://yummy-food-order.onrender.com/api/payment",
});

export const createOrder = async (amount) => {
    const response = await API.post("/create-order", { amount });
    return response.data;
};

export const verifyPayment = async (paymentData) => {
    const response = await API.post("/verify-payment", paymentData);
    return response.data;
};