import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Data from "../models/model";

type InitialState = {
    tableData: Data[]
}

const initialState: InitialState = {
    tableData: []
}

// This slice includes the part of the store that is associated with the table component
const tableSlice = createSlice({
    name: 'table',
    initialState: initialState,
    reducers: {
        addTableData(state, action: PayloadAction<Data[]>) {
            state.tableData = action.payload
        }
    }
})

export const tableAction = tableSlice.actions;

export default tableSlice.reducer;