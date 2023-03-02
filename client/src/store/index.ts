import { configureStore } from "@reduxjs/toolkit"
import tableSliceReducer from "./tableSlice";
import graphSliceReducer from "./graphSlice";

// Redux store
const store = configureStore({
    reducer: { table: tableSliceReducer, graph: graphSliceReducer }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch