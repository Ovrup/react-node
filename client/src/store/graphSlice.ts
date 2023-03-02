import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Data from "../models/model";

type InitialState = {
    graphData: Data[],
    startDate: Date,
    endDate: Date
}

const initialState: InitialState = {
    graphData: [],
    startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 2)),
    endDate: new Date()
}

// This slice includes the part of the store that is associated with the graph component
const graphSlice = createSlice({
    name: 'graph',
    initialState: initialState,
    reducers: {
        addGraphData(state, action: PayloadAction<Data[]>) {
            state.graphData = action.payload
        },
        setStartDate(state, action: PayloadAction<Date>) {
            state.startDate = action.payload
        },
        setEndDate(state, action: PayloadAction<Date>) {
            state.endDate = action.payload
        }
    }
})

export const graphAction = graphSlice.actions;

export default graphSlice.reducer;