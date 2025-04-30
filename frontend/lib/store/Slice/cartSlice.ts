import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        data: [] as any[], // Explicitly define the type of data
    },
    reducers: {
        setCart(state, action) {
            state.data = action.payload;
        },
        addItem(state, action) {
            const exists = state.data.some(item => item._id === action.payload._id);
            if (!exists) {
                state.data.push(action.payload);
            }
        },
        removeItem(state, action) {
            state.data = state.data.filter(item => item.item._id !== action.payload);
        },
        updateCartItem(state, action) {
            const { _id, amount, selected, qty } = action.payload;
            const item = state.data.find(item => item.item._id === _id);
            if (item) {
                item.amount = amount;
                item.selected = selected;
                item.qty = qty;
            }
        }
    },
});

export const cartActions = cartSlice.actions;

export default cartSlice;