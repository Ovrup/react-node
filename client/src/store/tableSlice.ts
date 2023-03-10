import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Data } from "../models/model";
import { uniqueValueType, uniqueColumnType } from "../models/model";
import ColumnAttribute from "../models/model.column";

type InitialState = {
    tableData: Data[];
    totalPageCount: number,
    newColumns: ColumnAttribute[],
    uniqueColumnVal: uniqueColumnType
}

const initialState: InitialState = {
    tableData: [],
    totalPageCount: 0,
    newColumns: [
        new ColumnAttribute('type', 'Type', 'string', 'left', true, true, '100px'),
        new ColumnAttribute('severity', 'Severity', 'string', 'left', true, false, '100px'),
        new ColumnAttribute('kill_chain_phase', 'Kill chain phase', 'string', 'left', true, false, '200px'),
        new ColumnAttribute('timestamp', 'Timestamp', 'datetime', 'left', true, true, '300px'),
        new ColumnAttribute('attacker_id', 'Attacker id', 'string', 'left', true, true, '200px'),
        new ColumnAttribute('attacker_ip', 'Attacker ip', 'string', 'left', true, true, '200px'),
        new ColumnAttribute('attacker_name', 'Attacker name', 'string', 'left', true, true, '200px'),
        new ColumnAttribute('attacker_port', 'Attacker port', 'number', 'left', true, false, '200px'),
        new ColumnAttribute('decoy_id', 'Decoy id', 'number', 'left', true, false, '200px'),
        new ColumnAttribute('decoy_name', 'Decoy name', 'string', 'left', true, true, '200px'),
        new ColumnAttribute('decoy_group', 'Decoy group', 'string', 'left', true, false, '200px'),
        new ColumnAttribute('decoy_ip', 'Decoy ip', 'string', 'left', true, false, '200px'),
        new ColumnAttribute('decoy_port', 'Decoy port', 'number', 'left', true, false, '200px'),
        new ColumnAttribute('decoy_type', 'Decoy Type', 'string', 'left', true, false, '200px')
    ],
    uniqueColumnVal: {
        type: [],
        severity: [],
        kill_chain_phase: [],
        timestamp: [],
        attacker_id: [],
        attacker_ip: [],
        attacker_name: [],
        attacker_port: [],
        decoy_id: [],
        decoy_name: [],
        decoy_group: [],
        decoy_ip: [],
        decoy_port: [],
        decoy_type: []
    }
}

// This slice includes the part of the store that is associated with the table component
const tableSlice = createSlice({
    name: 'table',
    initialState: initialState,
    reducers: {
        addTableData(state, action: PayloadAction<Data[]>) {
            state.tableData = action.payload
        },
        addTotalPageCount(state, action: PayloadAction<number>) {
            state.totalPageCount = action.payload
        },
        setNewColumns(state, action: PayloadAction<ColumnAttribute[]>) {
            state.newColumns = action.payload
        },
        setUniqueColumnVal(state, action: PayloadAction<uniqueColumnType>) {
            state.uniqueColumnVal = action.payload
        }
    }
})

export const tableAction = tableSlice.actions;

export default tableSlice.reducer;