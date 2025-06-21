import { createSlice } from "@reduxjs/toolkit";


const connectionSlice = createSlice({
    name: "connections",
    initialState: null,
    reducers: {
        addConnections: ( state, action ) => action.payload,
        removeConnections: ( state, action ) => null,
        // updateConnection: (state, action) => {
        //     const newState = 
        // }
    }
})



export const { addConnections, removeConnections, updateConnection } = connectionSlice.actions;
export default connectionSlice.reducer;